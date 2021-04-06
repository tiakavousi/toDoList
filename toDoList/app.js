
$(function(){

    let toDoTasks;
    let doingTasks;
    let doneTasks;


    //submit event on form :
    $('form').on('submit',handelSubmitForm);
    $('ol').on('click', handle_start_Delete_edit_finish);
    $('.deleteAll').on('click', handleDeleteAll);
    $(document).on('dbclick', function(e){
        e.preventDefault();
    });
    $('#clearThePage').on('click', clearThePage);
    
    //handlers 

    function handelSubmitForm(event){
        event.preventDefault();
        let val = $('#input').val();
        if (val != ''){
            let htmlString = '<span class="textItem" contenteditable="true">'+ val+'</span>'
            let elem = $('<li class="toDoItem"></li>').html(htmlString);
            elem.append('<i class="trash far fa-trash-alt"></i>');
            elem.append('<i class="start fas fa-play"></i>');
            $('#toDoList').append(elem);
            $('#placeHolderToDo').addClass('hidden');
            $('#input').val('');

            toDoTasks = $('#toDoList>li').get();
            if(toDoTasks.length > 1){
                $('.deleteAll').removeClass('hidden');
            }
        }
    }

    function handle_start_Delete_edit_finish(e){
        let target = $(e.target);
        if(target.hasClass('start')){
            startToDo(e);
        }
        if(target.hasClass('trash')){
            deleteToDo(e);
        }
        if(target.hasClass('edit')){
            editToDo(e);
        }
        if(target.hasClass('finish')){
            finishDoing(e);
        }
    }

    function deleteToDo (e){
        let item = $(e.target).parent();
        item.remove();
        if(item.hasClass('toDoItem')) toDoTasks.pop();
        if(item.hasClass('doingItem')) doingTasks.pop();
        if(item.hasClass('doneItem')) doneTasks.pop();
        if(toDoTasks.length < 2){
            $('.deleteAll').addClass('hidden');
        }
        if(toDoTasks.length == 0){
            $('#placeHolderToDo').removeClass('hidden')
        }
        if(doingTasks.length == 0){
            $('#placeHolderDoing').removeClass('hidden')
        }
        if(doneTasks.length == 0){
            $('#placeHolderDone').removeClass("hidden");
        }
    }

    function startToDo(e){
        let item = $(e.target).parent();
        item.addClass('started');
        $('#placeHolderDoing').addClass('hidden');
        $('#doingList').append(item);
        item.removeClass('toDoItem');
        item.addClass('doingItem');
        $('li.started>i.start').remove();
        item.append('<i class="finish fas fa-check"></i>');
        toDoTasks.pop();
        if(toDoTasks.length == 0)$('#placeHolderToDo').removeClass('hidden');
        if(toDoTasks.length < 2){
            $('.deleteAll').addClass('hidden');
        }
        doingTasks = $('#doingList>li').get();
    }

     function finishDoing(e){
        let item = $(e.target).parent();
        item.addClass('finished');
        $('#placeHolderDone').addClass('hidden');
        $('#doneList').append(item);
        item.removeClass('doingItem');
        item.addClass('doneItem');
        $('li.finished>i.finish').remove();
        doingTasks.pop();
        if(doingTasks.length == 0)$('#placeHolderDoing').removeClass('hidden');
        doneTasks = $('#doneList>li').get();
     }

    function handleDeleteAll(){
        $('#toDoList').remove();
        $(this).addClass('hidden');
        $('#placeHolderDone').removeClass("hidden");
        toDoTasks = [];
    }

    function clearThePage(e){
        $('li').remove();
        $('#placeHolderToDo').removeClass("hidden");
        $('#placeHolderDoing').removeClass("hidden");
        $('#placeHolderDone').removeClass("hidden");
    }
    
});






