const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // To store the deferred prompt

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Store the event to use it later
  deferredPrompt = event;

  // Logic to show your custom install button
  butInstall.style.display = 'block';

  // TODO: Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    // Show the install prompt when the custom button is clicked
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      deferredPrompt = null; // Reset the deferred prompt after user interaction
    }
  });
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed!', event);
});
