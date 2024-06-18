let progress = document.getElementById("progress");
        let song = document.getElementById("song");
        let ctrlIcon = document.getElementById("ctrlIcon");
        let backwardBtn = document.querySelector(".fa-backward");
        let forwardBtn = document.querySelector(".fa-forward");
        let currentTimeDisplay = document.getElementById("current-time");
        let durationDisplay = document.getElementById("duration");
        let intervalId; // To store the interval ID for clearInterval

        song.addEventListener('loadedmetadata', function () {
            progress.max = song.duration;
            durationDisplay.textContent = formatTime(song.duration);
        });

        function playPause() {
            if (song.paused || song.ended) {
                song.play();
                ctrlIcon.classList.remove("fa-play");
                ctrlIcon.classList.add("fa-pause");
                intervalId = setInterval(updateTimeDisplay, 500); // Start interval to update time display
            } else {
                song.pause();
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");
                clearInterval(intervalId); // Stop interval when paused
            }
        }

        function updateTimeDisplay() {
            progress.value = song.currentTime;
            currentTimeDisplay.textContent = formatTime(song.currentTime);
        }

        progress.oninput = function () {
            song.currentTime = progress.value;
            currentTimeDisplay.textContent = formatTime(song.currentTime);
        };

        backwardBtn.addEventListener("click", function () {
            song.currentTime -= 5; // Go back 5 seconds
        });

        forwardBtn.addEventListener("click", function () {
            song.currentTime += 5; // Go forward 5 seconds
        });

        function directTohome() {
            window.location.href = "index.html";
        }

        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if seconds < 10
            return minutes + ':' + seconds;
        }