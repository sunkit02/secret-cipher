const parseErrorMessage = (errorMessage: any) => {
    let result: string | null = null;
    // ensure that the error message is a string
    // and convert to string if not
    if (typeof errorMessage !== "string") {
        try {
            result = errorMessage?.toString();
        } catch (e) {
            // default error message if cannot call toString method
            result = "An error occurred"
        }
    }

    return result === null ? errorMessage : result;
}

export {parseErrorMessage};