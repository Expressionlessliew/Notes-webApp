const trackList = document.getElementById('trackList');
const audioPlayer = document.getElementById('audioPlayer');

// Play the selected track
function playTrack(trackUrl) {
  audioPlayer.src = trackUrl;
  audioPlayer.play();
}

// Attach click event listeners to the track list items
const trackItems = trackList.getElementsByTagName('li');
for (let i = 0; i < trackItems.length; i++) {
  const trackItem = trackItems[i];
  const trackUrl = trackItem.getAttribute('data-src');

  trackItem.addEventListener('click', () => {
    playTrack(trackUrl);
  });
}
