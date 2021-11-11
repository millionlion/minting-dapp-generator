export const fetchJson = async (path) => {
    const abiResponse = await fetch(path, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    return await abiResponse.json();
}
