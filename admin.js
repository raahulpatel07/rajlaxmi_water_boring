"use strict";

const client = window.getRajlaxmiSupabase();

const config = window.RAJLAXMI_CONFIG;

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const loginForm = document.getElementById("loginForm");
const uploadForm = document.getElementById("uploadForm");

const loginMessage = document.getElementById("loginMessage");
const uploadMessage = document.getElementById("uploadMessage");
const galleryMessage = document.getElementById("galleryMessage");

const loginBtn = document.getElementById("loginBtn");
const uploadBtn = document.getElementById("uploadBtn");

const adminGallery = document.getElementById("adminGallery");

const photoFile = document.getElementById("photoFile");
const photoPreview = document.getElementById("photoPreview");
const previewBox = document.getElementById("previewBox");

let previewUrl = null;


// MESSAGE HELPER

function showMessage(element, text, type = "") {

    element.textContent = text;

    element.className = `message ${type}`;

}


// AUTHENTICATION CHECK

async function getAuthorizedUser() {

    if (!client) {
        return null;
    }

    const { data, error } = await client.auth.getUser();

    if (error || !data.user) {
        return null;
    }

    const { data: owner, error: ownerError } = await client
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

    if (ownerError || !owner) {
        return null;
    }

    return data.user;
}


// SHOW LOGIN / DASHBOARD

function showLogin() {

    loginSection.hidden = false;

    dashboardSection.hidden = true;

}

function showDashboard(user) {

    loginSection.hidden = true;

    dashboardSection.hidden = false;

    document.getElementById("loggedInEmail").textContent =
        user.email || "Authorized Owner";

}


// LOGIN

loginForm.addEventListener("submit", async event => {

    event.preventDefault();

    if (!client) {

        showMessage(
            loginMessage,
            "Supabase abhi configure nahi hai. Account setup ke baad login chalega.",
            "error"
        );

        return;
    }

    const email = document.getElementById("adminEmail").value.trim();

    const password = document.getElementById("adminPassword").value;

    loginBtn.disabled = true;

    showMessage(loginMessage, "Logging in...");

    try {

        const { error } = await client.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw error;
        }

        const user = await getAuthorizedUser();

        if (!user) {

            await client.auth.signOut();

            throw new Error("This account is not authorized as owner.");
        }

        showDashboard(user);

        loginForm.reset();

        await loadAdminGallery();

    } catch (error) {

        showMessage(loginMessage, error.message, "error");

    } finally {

        loginBtn.disabled = false;

    }

});


// LOGOUT

document.getElementById("logoutBtn").addEventListener("click", async () => {

    if (client) {
        await client.auth.signOut();
    }

    showLogin();

});


// IMAGE PREVIEW

photoFile.addEventListener("change", () => {

    const file = photoFile.files[0];

    if (previewUrl) {

        URL.revokeObjectURL(previewUrl);

        previewUrl = null;
    }

    if (!file) {

        previewBox.hidden = true;

        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {

        photoFile.value = "";

        previewBox.hidden = true;

        showMessage(
            uploadMessage,
            "Please select a JPG, PNG or WebP image.",
            "error"
        );

        return;
    }

    previewUrl = URL.createObjectURL(file);

    photoPreview.src = previewUrl;

    previewBox.hidden = false;

});


// IMAGE COMPRESSION

async function compressImage(file) {

    const bitmap = await createImageBitmap(file);

    try {

        const maxDimension = 1600;

        const scale = Math.min(
            1,
            maxDimension / Math.max(bitmap.width, bitmap.height)
        );

        const canvas = document.createElement("canvas");

        canvas.width = Math.max(1, Math.round(bitmap.width * scale));

        canvas.height = Math.max(1, Math.round(bitmap.height * scale));

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Image processing is not supported.");
        }

        context.drawImage(
            bitmap,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const blob = await new Promise((resolve, reject) => {

            canvas.toBlob(result => {

                if (result) {
                    resolve(result);
                } else {
                    reject(new Error("Image compression failed."));
                }

            }, "image/webp", 0.78);

        });

        return blob;

    } finally {

        bitmap.close();

    }

}


// UPLOAD PHOTO

uploadForm.addEventListener("submit", async event => {

    event.preventDefault();

    if (!client) {

        showMessage(
            uploadMessage,
            "Supabase configuration required.",
            "error"
        );

        return;
    }

    const user = await getAuthorizedUser();

    if (!user) {

        showMessage(
            uploadMessage,
            "Owner login required.",
            "error"
        );

        showLogin();

        return;
    }

    const title = document.getElementById("photoTitle").value.trim();

    const location = document.getElementById("photoLocation").value.trim();

    const file = photoFile.files[0];

    if (!title || !file) {

        showMessage(
            uploadMessage,
            "Photo aur title dono zaruri hain.",
            "error"
        );

        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {

        showMessage(
            uploadMessage,
            "Only JPG, PNG and WebP images are allowed.",
            "error"
        );

        return;
    }

    if (file.size > config.maxUploadMB * 1024 * 1024) {

        showMessage(
            uploadMessage,
            `Please select an image smaller than ${config.maxUploadMB} MB.`,
            "error"
        );

        return;
    }

    uploadBtn.disabled = true;

    showMessage(uploadMessage, "Compressing photo...");

    let uploadedPath = null;

    try {

        const optimizedImage = await compressImage(file);

        const fileName = `${crypto.randomUUID()}.webp`;

        // Owner-specific folder; storage policies check this path.

        const filePath = `${user.id}/${fileName}`;

        showMessage(uploadMessage, "Uploading photo...");

        const { error: storageError } = await client.storage
            .from(config.galleryBucket)
            .upload(filePath, optimizedImage, {
                contentType: "image/webp",
                upsert: false
            });

        if (storageError) {
            throw storageError;
        }

        uploadedPath = filePath;

        const { error: databaseError } = await client
            .from(config.galleryTable)
            .insert({
                title,
                location,
                image_path: filePath,
                uploaded_by: user.id
            });

        if (databaseError) {
            throw databaseError;
        }

        showMessage(
            uploadMessage,
            "✅ Photo uploaded successfully!",
            "success"
        );

        uploadForm.reset();

        previewBox.hidden = true;

        if (previewUrl) {

            URL.revokeObjectURL(previewUrl);

            previewUrl = null;
        }

        await loadAdminGallery();

    } catch (error) {

        // If database insertion fails, try removing the unused image.

        if (uploadedPath) {

            await client.storage
                .from(config.galleryBucket)
                .remove([uploadedPath]);

        }

        showMessage(uploadMessage, error.message, "error");

    } finally {

        uploadBtn.disabled = false;

    }

});


// LOAD OWNER GALLERY

async function loadAdminGallery() {

    if (!client) {
        return;
    }

    const user = await getAuthorizedUser();

    if (!user) {

        showLogin();

        return;
    }

    showMessage(galleryMessage, "Loading gallery...");

    const { data, error } = await client
        .from(config.galleryTable)
        .select("id, title, location, image_path, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

    if (error) {

        showMessage(galleryMessage, error.message, "error");

        return;
    }

    adminGallery.replaceChildren();

    document.getElementById("totalPhotos").textContent = data.length;

    if (data.length === 0) {

        const empty = document.createElement("p");

        empty.className = "empty-gallery";

        empty.textContent = "Abhi koi photo upload nahi hui hai.";

        adminGallery.appendChild(empty);

        showMessage(galleryMessage, "");

        return;
    }

    data.forEach(photo => {

        const { data: publicUrlData } = client.storage
            .from(config.galleryBucket)
            .getPublicUrl(photo.image_path);

        const card = document.createElement("article");

        card.className = "admin-photo-card";

        const image = document.createElement("img");

        image.src = publicUrlData.publicUrl;

        image.alt = photo.title;

        image.loading = "lazy";

        const info = document.createElement("div");

        info.className = "admin-photo-info";

        const title = document.createElement("h3");

        title.textContent = photo.title;

        const location = document.createElement("p");

        location.textContent = photo.location || "Location not added";

        const deleteBtn = document.createElement("button");

        deleteBtn.className = "delete-btn";

        deleteBtn.textContent = "🗑 Delete Photo";

        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            deletePhoto(photo);
        });

        info.append(title, location, deleteBtn);

        card.append(image, info);

        adminGallery.appendChild(card);

    });

    showMessage(galleryMessage, "");

}


// DELETE PHOTO

async function deletePhoto(photo) {

    const confirmed = confirm(
        `Delete "${photo.title}" permanently?`
    );

    if (!confirmed) {
        return;
    }

    const user = await getAuthorizedUser();

    if (!user) {

        showLogin();

        return;
    }

    showMessage(galleryMessage, "Deleting photo...");

    try {

        /*
        Delete database record first.

        Storage deletion is attempted immediately after.
        If storage deletion fails, an unused file may remain
        and will need cleanup.
        */

        const { error: databaseError } = await client
            .from(config.galleryTable)
            .delete()
            .eq("id", photo.id);

        if (databaseError) {
            throw databaseError;
        }

        const { error: storageError } = await client.storage
            .from(config.galleryBucket)
            .remove([photo.image_path]);

        if (storageError) {
            throw storageError;
        }

        await loadAdminGallery();

        showMessage(
            galleryMessage,
            "✅ Photo deleted successfully.",
            "success"
        );

    } catch (error) {

        showMessage(galleryMessage, error.message, "error");

        await loadAdminGallery();

    }

}


// REFRESH

document.getElementById("refreshGalleryBtn").addEventListener(
    "click",
    loadAdminGallery
);


// INITIALIZATION

async function initializeAdmin() {

    document.getElementById("adminYear").textContent =
        new Date().getFullYear();

    if (!client) {

        showLogin();

        showMessage(
            loginMessage,
            "Supabase account abhi connect nahi hai. Setup ke baad login available hoga."
        );

        return;
    }

    const user = await getAuthorizedUser();

    if (user) {

        showDashboard(user);

        await loadAdminGallery();

    } else {

        showLogin();

    }

}

initializeAdmin();