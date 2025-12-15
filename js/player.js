/**
 * Класс аудиоплеера
 */
class AudioPlayer {
  constructor() {
    // Создание аудио элемента
    this.audio = new Audio();
    
    // Состояние плеера
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isRepeat = false;
    this.isShuffle = false;
    this.isMuted = false;
    this.previousVolume = 0.8;
    
    // Массив треков (будет заполнен демо-данными)
    this.trackList = [];
    
    // Инициализация
    this.initDOMElements();
    this.initTracks();
    this.bindEvents();
    this.loadTrack();
    this.renderPlaylist();
    
    // Восстановление громкости из localStorage
    this.restoreSettings();
  }

  /**
   * Инициализация DOM элементов
   */
  initDOMElements() {
    // Кнопки управления
    this.playBtn = document.querySelector('.play-btn');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.repeatBtn = document.querySelector('.repeat-btn');
    this.shuffleBtn = document.querySelector('.shuffle-btn');
    
    // Иконки play/pause
    this.playIcon = document.querySelector('.play-icon');
    this.pauseIcon = document.querySelector('.pause-icon');
    
    // Ползунки
    this.seekSlider = document.querySelector('.seek-slider');
    this.volumeSlider = document.querySelector('.volume-slider');
    
    // Время
    this.currentTime = document.querySelector('.current-time');
    this.totalDuration = document.querySelector('.total-duration');
    
    // Информация о треке
    this.trackTitle = document.querySelector('.track-title');
    this.trackArtist = document.querySelector('.track-artist');
    this.albumArt = document.querySelector('.album-art');
    
    // Прогресс бар
    this.progressFill = document.querySelector('.progress-fill');
    
    // Громкость
    this.volumeBtn = document.querySelector('.volume-btn');
    this.volumeIcon = document.querySelector('.volume-icon');
    this.volumeMuteIcon = document.querySelector('.volume-mute-icon');
    
    // Плейлист
    this.playlist = document.querySelector('.playlist');
  }

  /**
   * Инициализация треков (демо-данные)
   */
  initTracks() {
    this.trackList = [
      {
        title: '99 Problems (BUTT a TWERK Ain\'t One)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - 99 Problems (BUTT a TWERK Ain\'t One).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A Light That Never Comes (feat. Steve Aoki. Angger Dimas Remix)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A Light That Never Comes (feat. Steve Aoki. Angger Dimas Remix).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A Light That Never Comes (feat. Steve Aoki. Rick Rubin Remix)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A Light That Never Comes (feat. Steve Aoki. Rick Rubin Remix).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A LIGHT THAT NEVER COMES (feat. Steve Aoki)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A LIGHT THAT NEVER COMES (feat. Steve Aoki).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A LIGHT THAT NEVER COMES REMIX',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A LIGHT THAT NEVER COMES REMIX.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A Place For My Head (тяжелый рок)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A Place For My Headтежелый рок.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A.06',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A.06.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'A6 (Meteora20 Demo)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - A6 (Meteora20 Demo).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Angel in Disguise',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Angel in Disguise.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Bad man',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Bad man.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Battle symphony (Новинки 2017 Весна)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Battle symphony (Новинки 2017 Весна).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Big Pimpin\'-Papergut (Linkin Park & Jay-Z)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Big Pimpin\'-Papergut (Linkin Park & Jay-Z).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Blackout (Renholder Remix)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Blackout (Renholder Remix).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Blue',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Blue.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Breaking The Habit (Broskey Remix)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Breaking The Habit (Broskey Remix).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Breaking the Habit (Original Mike 2002 Demo)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Breaking the Habit (Original Mike 2002 Demo).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Brick In The Wall',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Brick In The Wall.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'In the End (Album Version)',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - In the End (Album Version).mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'The Emptiness Machine',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - The Emptiness Machine.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      },
      {
        title: 'Намб',
        artist: 'Linkin Park',
        path: 'audio/Linkin Park - Намб.mp3',
        cover: 'images/linkin_park_orig.jpg',
        duration: 0
      }
    ];
  }

  /**
   * Привязка обработчиков событий
   */
  bindEvents() {
    // Кнопки управления
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    
    // Ползунки
    this.seekSlider.addEventListener('input', (e) => this.seek(e));
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e));
    
    // Громкость
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    
    // События аудио элемента
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.setDuration());
    this.audio.addEventListener('ended', () => this.handleTrackEnd());
    this.audio.addEventListener('error', (e) => this.handleError(e));
    
    // Плейлист
    this.playlist.addEventListener('click', (e) => this.handlePlaylistClick(e));
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  /**
   * Воспроизведение/пауза
   */
  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.updatePlayButton();
    } else {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
          })
          .catch(error => {
            console.error('Ошибка воспроизведения:', error);
            // Трек не существует, показываем заглушку
            this.isPlaying = false;
            this.updatePlayButton();
          });
      }
    }
  }

  /**
   * Обновление кнопки воспроизведения
   */
  updatePlayButton() {
    if (this.isPlaying) {
      this.playIcon.classList.add('hidden');
      this.pauseIcon.classList.remove('hidden');
    } else {
      this.playIcon.classList.remove('hidden');
      this.pauseIcon.classList.add('hidden');
    }
  }

  /**
   * Следующий трек
   */
  nextTrack() {
    if (this.isShuffle) {
      // Случайный трек (но не текущий)
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.trackList.length);
      } while (newIndex === this.currentTrackIndex && this.trackList.length > 1);
      this.currentTrackIndex = newIndex;
    } else {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.trackList.length;
    }
    this.loadTrack();
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  /**
   * Предыдущий трек
   */
  prevTrack() {
    // Если прошло более 3 секунд, перематываем в начало
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
    } else {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.trackList.length) % this.trackList.length;
      this.loadTrack();
      if (this.isPlaying) {
        this.audio.play();
      }
    }
  }

  /**
   * Загрузка трека
   */
  loadTrack() {
    const track = this.trackList[this.currentTrackIndex];
    
    // Установка источника
    this.audio.src = track.path;
    
    // Обновление информации
    this.trackTitle.textContent = track.title;
    this.trackArtist.textContent = track.artist;
    this.albumArt.src = track.cover;
    
    // Обработка ошибки загрузки изображения
    this.albumArt.onerror = () => {
      this.albumArt.src = 'images/default-cover.jpg';
    };
    
    // Сброс прогресса
    this.seekSlider.value = 0;
    this.progressFill.style.width = '0%';
    this.currentTime.textContent = '0:00';
    
    // Установка примерной длительности из данных
    this.totalDuration.textContent = this.formatTime(track.duration);
    
    // Обновление плейлиста
    this.updatePlaylistActiveItem();
    
    // Сохранение позиции в localStorage
    this.saveSettings();
  }

  /**
   * Перемотка
   */
  seek(e) {
    const seekTime = this.audio.duration * (e.target.value / 100);
    if (!isNaN(seekTime)) {
      this.audio.currentTime = seekTime;
    }
  }

  /**
   * Обновление прогресса
   */
  updateProgress() {
    if (!isNaN(this.audio.duration)) {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.seekSlider.value = progress;
      this.progressFill.style.width = progress + '%';
      this.currentTime.textContent = this.formatTime(this.audio.currentTime);
    }
  }

  /**
   * Установка длительности
   */
  setDuration() {
    if (!isNaN(this.audio.duration)) {
      this.totalDuration.textContent = this.formatTime(this.audio.duration);
    }
  }

  /**
   * Установка громкости
   */
  setVolume(e) {
    const volume = e.target.value / 100;
    this.audio.volume = volume;
    this.previousVolume = volume;
    this.isMuted = volume === 0;
    this.updateVolumeIcon();
    this.saveSettings();
  }

  /**
   * Переключение режима без звука
   */
  toggleMute() {
    if (this.isMuted) {
      this.audio.volume = this.previousVolume;
      this.volumeSlider.value = this.previousVolume * 100;
      this.isMuted = false;
    } else {
      this.previousVolume = this.audio.volume;
      this.audio.volume = 0;
      this.volumeSlider.value = 0;
      this.isMuted = true;
    }
    this.updateVolumeIcon();
  }

  /**
   * Обновление иконки громкости
   */
  updateVolumeIcon() {
    if (this.isMuted || this.audio.volume === 0) {
      this.volumeIcon.classList.add('hidden');
      this.volumeMuteIcon.classList.remove('hidden');
    } else {
      this.volumeIcon.classList.remove('hidden');
      this.volumeMuteIcon.classList.add('hidden');
    }
  }

  /**
   * Переключение режима повтора
   */
  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    this.repeatBtn.classList.toggle('active');
    this.saveSettings();
  }

  /**
   * Переключение режима перемешивания
   */
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.shuffleBtn.classList.toggle('active');
    this.saveSettings();
  }

  /**
   * Обработка окончания трека
   */
  handleTrackEnd() {
    if (this.isRepeat) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      this.nextTrack();
    }
  }

  /**
   * Обработка ошибок
   */
  handleError(e) {
    console.error('Ошибка загрузки аудио:', e);
    // Можно показать уведомление пользователю
  }

  /**
   * Форматирование времени
   */
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  /**
   * Рендеринг плейлиста
   */
  renderPlaylist() {
    this.playlist.innerHTML = '';
    this.trackList.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'playlist-item';
      li.dataset.index = index;
      
      li.innerHTML = `
        <div class="playlist-item-number">${index + 1}</div>
        <div class="playlist-item-info">
          <div class="playlist-item-title">${track.title}</div>
          <div class="playlist-item-artist">${track.artist}</div>
        </div>
        <div class="playlist-item-duration">${this.formatTime(track.duration)}</div>
      `;
      
      this.playlist.appendChild(li);
    });
    
    this.updatePlaylistActiveItem();
  }

  /**
   * Обновление активного элемента плейлиста
   */
  updatePlaylistActiveItem() {
    const items = this.playlist.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
      if (index === this.currentTrackIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * Обработка клика по плейлисту
   */
  handlePlaylistClick(e) {
    const item = e.target.closest('.playlist-item');
    if (item) {
      const index = parseInt(item.dataset.index);
      this.currentTrackIndex = index;
      this.loadTrack();
      this.audio.play();
      this.isPlaying = true;
      this.updatePlayButton();
    }
  }

  /**
   * Обработка горячих клавиш
   */
  handleKeyboard(e) {
    // Проверяем, что фокус не в input элементе
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextTrack();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.prevTrack();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 5);
        this.setVolume({ target: this.volumeSlider });
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 5);
        this.setVolume({ target: this.volumeSlider });
        break;
      case 'KeyM':
        e.preventDefault();
        this.toggleMute();
        break;
      case 'KeyR':
        e.preventDefault();
        this.toggleRepeat();
        break;
      case 'KeyS':
        e.preventDefault();
        this.toggleShuffle();
        break;
    }
  }

  /**
   * Сохранение настроек в localStorage
   */
  saveSettings() {
    const settings = {
      volume: this.audio.volume,
      currentTrackIndex: this.currentTrackIndex,
      isRepeat: this.isRepeat,
      isShuffle: this.isShuffle
    };
    localStorage.setItem('audioPlayerSettings', JSON.stringify(settings));
  }

  /**
   * Восстановление настроек из localStorage
   */
  restoreSettings() {
    const savedSettings = localStorage.getItem('audioPlayerSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        
        // Восстановление громкости
        if (settings.volume !== undefined) {
          this.audio.volume = settings.volume;
          this.volumeSlider.value = settings.volume * 100;
          this.previousVolume = settings.volume;
          this.updateVolumeIcon();
        } else {
          // Значение по умолчанию
          this.audio.volume = 0.8;
          this.volumeSlider.value = 80;
        }
        
        // Восстановление режимов
        if (settings.isRepeat) {
          this.isRepeat = true;
          this.repeatBtn.classList.add('active');
        }
        
        if (settings.isShuffle) {
          this.isShuffle = true;
          this.shuffleBtn.classList.add('active');
        }
        
        // Восстановление текущего трека (опционально)
        // if (settings.currentTrackIndex !== undefined) {
        //   this.currentTrackIndex = settings.currentTrackIndex;
        //   this.loadTrack();
        // }
      } catch (e) {
        console.error('Ошибка восстановления настроек:', e);
        // Устанавливаем значение по умолчанию
        this.audio.volume = 0.8;
        this.volumeSlider.value = 80;
      }
    } else {
      // Первый запуск - устанавливаем громкость по умолчанию
      this.audio.volume = 0.8;
      this.volumeSlider.value = 80;
    }
  }
}

// Инициализация плеера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const player = new AudioPlayer();
});

