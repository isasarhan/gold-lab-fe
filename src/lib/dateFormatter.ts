export const dateFormatter = (value:string) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return formattedDate
}