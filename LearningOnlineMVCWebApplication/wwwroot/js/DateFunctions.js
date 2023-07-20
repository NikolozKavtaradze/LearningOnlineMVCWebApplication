function AddSubstractMonths(date,numMonths){
    let month = date.getMonth();

    let milliSeconds = new Date(date).setMonth(month + numMonths);

    return new Date(milliSeconds);

}