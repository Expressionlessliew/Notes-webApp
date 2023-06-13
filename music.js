const trackList = document.getElementById('trackList');
const audioPlayer = document.getElementById('audioPlayer');
const currentlyPlaying = document.getElementById('currentlyPlaying'); // Added reference to the paragraph element

let selectedTrack = null;

// Play the selected track
function playTrack(trackUrl, trackNameElement) {
  // Reset previous selected track
  if (selectedTrack) {
    selectedTrack.classList.remove('selected');
  }

  // Set the new selected track
  const trackName = trackNameElement.textContent;
  trackNameElement.classList.add('selected');

  selectedTrack = trackNameElement;

  audioPlayer.src = trackUrl;
  audioPlayer.play();

  // Update the "Currently Playing" text
  currentlyPlaying.textContent = 'Now Playing: ' + trackName;
}

// Attach click event listeners to the track list items
const trackItems = trackList.getElementsByTagName('li');
for (let i = 0; i < trackItems.length; i++) {
  const trackItem = trackItems[i];
  const trackUrl = trackItem.getAttribute('data-src');

  trackItem.addEventListener('click', () => {
    playTrack(trackUrl, trackItem);
  });
}
