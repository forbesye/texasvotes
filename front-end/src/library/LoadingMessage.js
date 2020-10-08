const loadingMessages =  [
    "Looking for the fabled Blue wave...",
    "Wiping off Cheeto dust...",
    "Reticulating splines...",
    "The server is powered by a lemon and two electrodes...",
    "Like this year could get any worse...",
    "Hindsight is 2020...",
    "Wear a mask..."
]

const randomLoadingMessage = () => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

export default randomLoadingMessage;