const play_music = document.querySelector('#play')
const play_forward = document.querySelector('#forward')
const play_backward = document.querySelector('#backward')
const play_random = document.querySelector('#random')
const play_refresh= document.querySelector('#refresh')
const currentTimeDisplay= document.querySelector('.time-current')
const duranceTimeDisplay= document.querySelector('.max-time')
const music_slider= document.querySelector('#music_slider')
const volume_slider= document.querySelector('#volume_slider')

const image_track = document.querySelector('.image-track')

const audio = document.createElement('audio')
const img = document.createElement('img')
img.classList.add('img-track')

let isPlaying = false
let track_index = 0
let shuffle = false
let nextlist = false
let adjustTimer = 0
let timer_track;

const playList = [
    {
        path:'./music/music1.wav',
        name:'sample 1',
        artist:'unknown',
        img:'./images/image1.jpg'
    },
    
    {
        path:'./music/music2.wav',
        name:'sample 2',
        artist:'unknown',
        img:'./images/image2.png'
    },
    {
        path:'./music/music3.wav',
        name:'sample 3',
        artist:'unknown',
        img:'./images/image3.jpg'
    },
 
]



listener(play_music , play)
listener(play_forward , nextList)
listener(play_backward , previos)
listener(play_random , random)
listener(play_refresh , refresh)
slider(music_slider , updateMusic)
slider(volume_slider , updateVolume)


function listener(element , cb){
    element.addEventListener('click' ,cb)
}
function slider(element , cb){
    element.addEventListener('change' ,cb)
}
function playMusic(){
    timer_track = clearInterval(updateTime)
    audio.src =playList[track_index].path
    img.src = playList[track_index].img
    image_track.append(img)
    timer_track = setInterval(updateTime , 1000)
    audio.load()
}
playMusic()


let firstClick = 0
function play(){
   if(firstClick === 0 && !isPlaying){
    audio.play()
    play_music.innerHTML = '&#x23f8;'
    }else if(isPlaying){
        audio.play()
        play_music.innerHTML = '&#x23f8;'
        isPlaying = false
    }else{
        audio.pause()
        isPlaying = true
        play_music.innerHTML = '&#x23f5;'
    }
    firstClick++
}

function nextList(){
    if(track_index >= playList.length -1) return
    firstClick = 0
    isPlaying = false
    track_index += 1
    playMusic()
    play()
}

function previos(){
    if(track_index <= 0) return
    firstClick = 0
   isPlaying = false
    track_index -= 1
    playMusic()
    play()
}
function random(){
    shuffle = true
    firstClick = 0
   isPlaying = false
    track_index  = Math.floor(Math.random() * 4)
    playMusic()
    play()
}
function refresh(){
    nextlist = true
    playMusic()
    play()
}

function updateVolume(){
  
    audio.volume =  volume_slider.value / 100
    document.documentElement.style.setProperty('--soundSlider' ,`${ volume_slider.value}%`)
}

function updateMusic(){
    console.log(music_slider.value)
    adjustTimer = audio.duration * (music_slider.value / 100)
    document.documentElement.style.setProperty('--musicSlider' ,`${music_slider.value}%`)
    audio.currentTime = adjustTimer
}

function updateTime(){
    
  
    let currentTime = audio.currentTime
    let duration =audio.duration
    let minutes = Math.floor(currentTime/ 60);
    let second =Math.floor(currentTime - minutes * 60);
    let minutesDuration = Math.floor(duration / 60)
    let secondDuration = Math.floor(duration - minutesDuration * 60)

    let sliderValue = currentTime* (100 / duration) || 0
    music_slider.value = sliderValue
    document.documentElement.style.setProperty('--musicSlider' ,`${sliderValue}%`)


   if(minutes < 10) {
       minutes = `0${minutes}`
   }
   if(second < 10){
    second = `0${second}`
   }
   if(minutesDuration < 10){
    minutesDuration = `0${minutesDuration}`
   }
   if(secondDuration < 10) {
    secondDuration =`0${secondDuration}`
   }

    if(currentTime === duration){
        if(nextlist){
            nextList()
        }else if(shuffle){
            random()
        }else{
            nextList()
        }
    }

    currentTimeDisplay.textContent = `${minutes} : ${second}`
    duranceTimeDisplay.textContent = `${minutesDuration} : ${secondDuration}`

}
