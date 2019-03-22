var homes = [
    {
        "h_id": "3",
        "city": "Dallas",
        "state": "TX",
        "zip": "75201",
        "price": "162500"
    }, {
        "h_id": "4",
        "city": "Bevery Hills",
        "state": "CA",
        "zip": "90210",
        "price": "3100003939250"
    }, {
        "h_id": "5",
        "city": "New York",
        "state": "NY",
        "zip": "00010",
        "price": "962500"
    },
    {
        "h_id": "45",
        "city": "New York",
        "state": "NY",
        "zip": "02310",
        "price": "100"
    }
];

let sortedHomes = homes.sort(function(a,b) {
    return parseInt(a.price) - parseInt(b.price)
})

console.log(sortedHomes)