//   consider using state to keep track of duration since post
  const timeAgo = (created) =>{
    let currentDate = new Date();
    console.log("current date", currentDate);
    let end = new Date(created);
    console.log("end", end);
    let timeDifference = currentDate - end;


  let minutes = Math.floor(timeDifference / (1000 * 60));
  let hours = Math.floor(timeDifference / (1000 * 60 * 60));
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
  }

  export default timeAgo;