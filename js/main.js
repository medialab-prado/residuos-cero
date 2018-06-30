var answers = {};
var questionMap = {};

function init(){
  $('section').each(function(index,item){
    var id = $(item).attr('id');
    if(id != undefined){
      questionMap[id]={};
    }
  });

  var prev = '1_1';
  var next = '';
  var keys = [];
  for(k in questionMap){
    keys.push(k);
  }
  for(var i=0;i < keys.length;i++){
    if(i>0){
      prev = keys[i-1];
    }
    if(i < keys.length){
      next = keys[i+1];
    }
    questionMap[keys[i]].prev = prev;
    questionMap[keys[i]].next = next;
  }
  console.log(questionMap);
}

function updateNav(){
  var id = $('section:visible').attr('id');
  var section = $('section:visible').data('section');
  $('#main-container').removeClass();
  $('#main-container').addClass("container-fluid "+section);
  if(questionMap[id]!=undefined){
    var prev = questionMap[id].prev;
    var next = questionMap[id].next;
    var group_size = +$("#"+id+"_prev").data('group-size');
    console.log("p:" + prev + "n:" + next);
    console.log($("#"+id).data('prev'));
    console.log($("#"+id).data('next'));
    prev = ($("#"+id).data('prev')!='') ? $("#"+id).data('prev') : prev;
    $("#"+id+"_prev").data('target',prev);
    $("#"+id+"_next").data('target',next);
  }
}

$(document).ready(function() {
  init();
  var showOptions = {
    complete: updateNav,
    duration: "slow"
  };
  var hideOptions = {
    duration: "slow"
  };
  function showSection(target,element){
    console.log("Target: " + target);
    $("section").hide(showOptions);
    $("#"+target).show(showOptions);
  }

  $(".question-action").on("click",function(e){
    e.preventDefault();
    var target = $(this).data('target');
    showSection(target,this);
  });
  $(".action-footer").on("click", function(e) {
    var next = $(this).data("target");
    showSection(next);
    $('#main-container').removeClass();
    $('#main-container').addClass("container-fluid "+next.replace('#',''));
  });

  $(".answer").on('click',function(e){
    e.preventDefault();
    $(this).toggleClass('selected');
    var id = $(this).data('id');
    var value = $(this).data('value');
    value = (value == undefined) ? $(this).val() : value;
    var detail = $(this).data('detail');
    var redirect = $(this).data('redirect');
    $(this).closest('section').removeClass('active');
    console.log(id+":"+value)
    console.log("detail:"+detail);
    console.log("redirect: " + redirect);
    answers[id]=value;
    if(detail){
      //$('.radio-detail').hide(hideOptions);
      $($(this).data('detail-target')).show(showOptions);
      return;
    }
    if(redirect == undefined){
      var next = $(this).data('next');
      console.log("@"+next+"@")
      next = (next == undefined || next=='') ? questionMap[id].next : next;
      console.log("> " + next);
      showSection(next,this);
    }
    console.log(answers);
  });
  $(".answer-quantity,.answer-frequency").on("change",function(e){
    //TODO Verificar que al menos una de todas las frecuencias del check este seleccionada
    var id = $(this).attr('id');
    var value = +$(this).val();
    var question_id = $(this).data('id');
    var answer_id = $(this).data('answer-id');
    var quantity = +$("#"+question_id+" #"+answer_id+"_quantity").val();
    var frequency = +$("#"+question_id+" #"+answer_id+"_frequency").val();
    console.log("q: " + quantity +" f:"+frequency);
    var enable =  frequency> 0 && quantity >0;
    console.log(question_id+"_next: " + !enable);
    $("#"+question_id+"_next").attr('disabled',!enable);
    answers[id] = value;
  });
  $(".exclusive").on('click',function(e){
    $(this).siblings().attr('disabled',true)
    $(this).siblings().each(function(item,element){
      if(element==e.target){
        return ;
      }
      console.log(item)
      $(element).toggleClass('selected');
      $(element).attr('disabled',false);
    })
  });
});
