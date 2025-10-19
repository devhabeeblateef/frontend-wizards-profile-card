const timeElem = document.querySelector('[data-testid="test-user-time"]');

const pad = (num, length = 2) => String(num).padStart(length, '0');

const updateTime = () => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const milliseconds = pad(now.getMilliseconds(), 3);
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    const formattedHours = String(hours); 

    timeElem.textContent = `${formattedHours}:${minutes}:${seconds}.${milliseconds} ${ampm}`;
};

updateTime();

setInterval(updateTime, 50);