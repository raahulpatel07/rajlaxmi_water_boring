"use strict";

/*
RAJLAXMI WATER BORING
SUPABASE CONFIGURATION

Supabase project banne ke baad:

1. Project URL
2. Publishable / anon key

Yahan fill karenge.

IMPORTANT:
Service-role key ya secret key kabhi frontend mein mat daalna.
*/

window.RAJLAXMI_CONFIG = {

    supabaseUrl: "https://ivjzxfvdvfmutpqqbgip.supabase.co",

    supabaseKey: "sb_publishable_DasIbz-QepDA8esBYvTCBA_qGOnSkWA",

    galleryBucket: "gallery",

    galleryTable: "gallery_photos",

    maxUploadMB: 5

};


window.getRajlaxmiSupabase = function () {

    const config = window.RAJLAXMI_CONFIG;

    if (
        !config.supabaseUrl ||
        !config.supabaseKey ||
        !window.supabase
    ) {
        return null;
    }

    if (!window.rajlaxmiSupabaseClient) {

        window.rajlaxmiSupabaseClient =
            window.supabase.createClient(
                config.supabaseUrl,
                config.supabaseKey
            );

    }

    return window.rajlaxmiSupabaseClient;

};