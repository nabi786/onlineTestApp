
const handleRadioValue = (e) => {

    // var e_arry = ["Sana", "Bisal", "Nabi Bkash"]

    var e = "Baksh15" 


    // var options = arr.push(questionArray[questionIndex]?.options);
    var options = [
        {
            "value": "Sana15"
        },
        {
            "value": "Baksh15"
        },
        {
            "value": "Qauid15"
        }
    ]

    var new_ary = []
    options.forEach((item,index)=>{
        // console.log(item)
        new_ary.push(item.value)
    })

    console.log("new_ary ", new_ary)
    
    
    var index = new_ary.indexOf(e)
    
    console.log("index ", index)

};




handleRadioValue()