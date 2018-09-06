$(function(){

  function buildHTML(message){
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    var html = `
      <div class="message" data-message-id="${message.id}">
        <div class="message-upper">
          <div class="message-upper__user-name">${message.name}</div>
          <div class="message-upper__time">${message.time}</div>
        </div>
        <div class="message-lower">
            <p class="message-lower__text">${message.content}</p>
        </div>
          ${insertImage}
      </div>`;
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-content').append(html)
      $('.form__submit').prop("disabled", false);
      $('.main-content').animate({scrollTop: $('.main-content')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
      $('.hidden').val('');

    })
    .fail(function(){
      alert('error');
    })
  })

  function update(){
    if($('.main-content')[0]){
      var message_id = $('.message:last').data('message-id');
      console.log(message_id);
    } else {
      var message_id = 0;
    }

    $.ajax({
      url: location.href,
      // #現在のアクションからデータを取得,.jsonでdata typeを指定
      type: 'GET',
      data: { message: {id: message_id} },
      dataType: 'json'
    })
    .done(function(json){
      console.log(json);
      var insertHTML = '';
      json.forEach(function(message){
          // #新しいmsgがある場合の時のみbuilidHTMLで作成、それをinsertHTMLに代入
        insertHTML += buildHTML(message);
          // #buildHTMLに加えていく
      })
      $('.main-content').append(insertHTML);
      $('.main-content').animate({scrollTop: $('.main-content')[0].scrollHeight}, 'fast');
      // #.main-contentの最下段に追加
    })
    .fail(function(json){
      alert('自動更新に失敗')
    })
  }
  var interval = setInterval(function(){
     if (window.location.href.match(/\/groups\/\d+\/messages/)){
       update();
     } else{
       clearInterval(interval)
     }
  }, 5000)
})
