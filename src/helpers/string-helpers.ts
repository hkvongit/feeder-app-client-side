export function getFeedSourceInitials(title: string): string {
    let output = "/"

    if (!title || title.trim().length === 0) {
        return output
    }
    // spliting sentence into 2 words
    // trim(): Removes leading and trailing whitespace from the string
    // split(/\s+/, 2): Splits the string wherever it finds one or more whitespace characters (spaces, tabs, or newlines). 2 indicates we need only 2 elements in the output array
    const wordsArray = title.trim().split(/\s+/, 2)
    if (wordsArray.length === 0) return output;

    let firstLetter = wordsArray[0][0]
    let secondLetter = wordsArray[1][0] ?? ""
    output = firstLetter + secondLetter

    return output.toUpperCase()
}