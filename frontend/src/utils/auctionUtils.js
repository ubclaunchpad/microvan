const sortAuctions = (auctionList) => {
    const upcomingList = []
    const currentList = []
    const pastList = []
    
    const now = new Date(Date.now());
    auctionList.forEach(auction => {
        if (new Date(auction.start_date) > now) {
            upcomingList.push(auction);
        } else if (new Date(auction.end_date) > now) {
            currentList.push(auction);
        } else {
            pastList.push(auction);
        }
    });

    return ({"upcoming": upcomingList, "current": currentList, "past": pastList});
}

export default sortAuctions;