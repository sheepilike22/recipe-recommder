var img_1, img_2;
var img_1_src, img_2_src;
//var descript_1, descript_2;
var category = 2;
var loaded_image_number = 0;
var q1, q2;
var detail_state = 0;
var image_state = [];
var mode = "training";

$.ajaxSetup({
  contentType: "application/json; charset=utf-8"
});

$(document).ready(function () {
    for(var i = 0; i < 20; i ++){
        image_state[i] = 0;

        $("#candidate_" + String(i + 1)).click(function(){
            var index = this.id.substring(10);
            if(image_state[index - 1] === 0){
                // 若被選擇
                $("#overlay_" + String(index)).show();
                $("#candidate_" + String(index)).css("opacity", "0.15");
                //$("#candidate_" + String(index)).css("border-color", "#F7B543");
                //$("#candidate_" + String(index)).css("border-width", "2px");
                image_state[index - 1] = 1;
                //console.log(image_state);
            } else {
                // 沒被選擇
                $("#overlay_" + String(index)).hide();
                $("#candidate_" + String(index)).css("opacity", "1");
                //$("#candidate_" + String(index)).css("border-color", "");
                //$("#candidate_" + String(index)).css("border-width", "");
                image_state[index - 1] = 0;
                //console.log(image_state);
            }
        });

        $("#overlay_" + String(i + 1)).click(function(){  // 在圖片上的圖示
            var index = this.id.substring(8);
            if(image_state[index - 1] === 0){
                $("#overlay_" + String(index)).show();
                $("#candidate_" + String(index)).css("opacity", "0.15");
                //$("#candidate_" + String(index)).css("border-color", "#F7B543");
                //$("#candidate_" + String(index)).css("border-width", "2px");
                image_state[index - 1] = 1;
                //console.log(image_state);
            } else {
                $("#overlay_" + String(index)).hide();
                $("#candidate_" + String(index)).css("opacity", "1");
                //$("#candidate_" + String(index)).css("border-color", "");
                //$("#candidate_" + String(index)).css("border-width", "");
                image_state[index - 1] = 0;
                //console.log(image_state);
            }
        });
    }
});