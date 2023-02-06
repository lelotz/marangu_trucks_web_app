'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "61080974d68bbde0a2834ca4fb0bf990",
"assets/assets/.idea/assets.iml": "24742e734b568c3f23d56498828ad0f3",
"assets/assets/.idea/misc.xml": "d4f288593ec15175e0ab2246a477dada",
"assets/assets/.idea/modules.xml": "2a97ebc8f707ef51fa9e334ab5e55f78",
"assets/assets/.idea/workspace.xml": "ea0986c52e9eacfdc692f275374059a8",
"assets/assets/images/icon.svg": "b1eeae4d5a2196f702dd5d88a9814767",
"assets/assets/images/lines.svg": "aa2d157f3c57bb50cbb6f24ee19120ad",
"assets/assets/images/logo_white.svg": "5d0979b15c38097cce96968255bcdafd",
"assets/assets/images/marangu-trucks.png": "f43ca034c564db5f3bf945ce87266e2b",
"assets/assets/images/marangu-trucks.svg": "348735fe336deca352c833b500d5dfc6",
"assets/assets/images/truck.png": "8b2c659c5e38137bf4603959663e1b88",
"assets/assets/images/truck2.jpg": "6ee01bb952c9f8e7cada5ff960041235",
"assets/assets/images/trucks.jpg": "4e10cdc4e3785a66ffeb5cd7672bd851",
"assets/assets/images/truck_containers.jpg": "193cd4df7158cd50316c0a61bb57c9e2",
"assets/assets/images/truck_new.jpg": "2356a3ccc9206bf185b9d7e8293e9f1e",
"assets/assets/images/truck_shadows.jpg": "861ad87ea4de91038907309dab6ff520",
"assets/FontManifest.json": "6dc0e1996137762a6ecbcac6bfc4c09a",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/lib/fonts/ubuntu-font/Ubuntu-B.ttf": "008e6bc48c8eaa5d2855d57e6b0b8595",
"assets/lib/fonts/ubuntu-font/Ubuntu-BI.ttf": "f270899858f8204b62043167ac8d9552",
"assets/lib/fonts/ubuntu-font/Ubuntu-C.ttf": "cd5e0e3fba97e8b64cf301bbb350d7cf",
"assets/lib/fonts/ubuntu-font/Ubuntu-L.ttf": "2759de5c01527bd9730b4d1838e6c938",
"assets/lib/fonts/ubuntu-font/Ubuntu-LI.ttf": "d8d09723b71ebb22bc31881877609622",
"assets/lib/fonts/ubuntu-font/Ubuntu-M.ttf": "2aaaafd5fe853746266cad7eafcc871e",
"assets/lib/fonts/ubuntu-font/Ubuntu-MI.ttf": "137201ae9563c760964063e122d587b7",
"assets/lib/fonts/ubuntu-font/Ubuntu-R.ttf": "7f0b42d1d6a4d3e646c558185f6711ea",
"assets/lib/fonts/ubuntu-font/Ubuntu-RI.ttf": "6da3b4e2adcbcf2889e59c81d2326a43",
"assets/lib/fonts/ubuntu-font/UbuntuMono-B.ttf": "0734aff79a8af321fb865c9ac2ef3e64",
"assets/lib/fonts/ubuntu-font/UbuntuMono-BI.ttf": "b935f119fe77bc5939c82f48d6ba1782",
"assets/lib/fonts/ubuntu-font/UbuntuMono-R.ttf": "9383f4b0bc1d264a5a7e094eb1ed0c0b",
"assets/lib/fonts/ubuntu-font/UbuntuMono-RI.ttf": "ee339fa5faeec9d644c8097583298d07",
"assets/NOTICES": "2b94cde2fd81514e61f4a081295083b8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c6e425374080853c64ad610e10629a66",
"/": "c6e425374080853c64ad610e10629a66",
"main.dart.js": "6a34a39f210dede0fd521ca382951c0f",
"manifest.json": "2fe4ff41e473cd4379d54c673cfb0675",
"version.json": "9d9b749ec59ab7d4272a343768a13759"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
