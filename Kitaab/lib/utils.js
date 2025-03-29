//convert the createdAt to : " Month year" format
export function formatMemberSince(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString("default",{month:"short"});
    const year = date.getFullYear();
    return `${month}/${year}`;
}

//convert the createdAt to : "Month Date, Year" format
export function formatPublishDate(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString("default",{month:"long"});
    const day = date.getDate();
    const year = date.getFullYear();
    return ` ${month} ${day}, ${year}`;
}