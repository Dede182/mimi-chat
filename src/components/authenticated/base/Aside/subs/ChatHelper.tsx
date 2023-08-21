
export const cutTime = (date: string) => {
    const today = new Date();
    const seemAtDate = new Date(date);

    const timeDifference = today.getTime() - seemAtDate.getTime();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    let displayTime: string;

    if (timeDifference >= oneDayInMillis) {
        // More than 1 day ago, show date
        //show only month and day like 06/12
        displayTime = seemAtDate.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    }
    else {
        // Less than 1 day ago, show hours with am or prm
        displayTime = seemAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return displayTime;
}

export const cutString = (text: string,point : number = 20) =>
{
    return text !== null && text.length > point ? `${text.substring(0, point)}...` : text;
}

export const toHour = (timestamp :string) =>{
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return formattedTime;
  }
  

export const groupByDate = (data : any[])  =>
{
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const groupedMessages: any = {};
    data.forEach((item) =>{
        const messageDate = new Date(item.created_at);
        const day = messageDate.getDate().toString().padStart(2, '0');
        const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
        const year = messageDate.getFullYear().toString().slice(-2); // Last two digits of the year
        const formattedDate = `${day}-${month}-${year}`;

        messageDate.setHours(0, 0, 0, 0); // Set time to the start of the day
        if (!groupedMessages[formattedDate]) {
          groupedMessages[formattedDate] = [];
        }
      
        groupedMessages[formattedDate].push(item);
    })

    

    return groupedMessages;
}