$(function () {
    function WireUpDatePicker(){
        const addMonths = 2;
        let currDate = new Date();
        $('.datepicker').datepicker(
            {
                dateFormat: 'yy-mm-dd',
                minDate: currDate,
                maxDate: AddSubstractMonths(currDate,addMonths)
            }
        );
    }
    
    WireUpDatePicker();
});