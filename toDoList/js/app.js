var timeStamp, obj, version;


// Events ******************************************************
$(function(){

    let toDoTasks, doingTasks, doneTasks;

    //submit event on form 
    $('form').on('submit',handleSubmit);

    $('ol').on('click', handleButtons);

    $('.deleteAll').on('click', handleDeleteAll);

    $(document).on('dbclick', function(e){
        e.preventDefault();
    });

    $('#clearThePage').on('click', clearThePage);
    
    //handlers

    function handleSubmit(e){
        e.preventDefault();
        let val = $('#input').val();
        if (val != ''){
            let htmlString = '<span class="textItem" contenteditable="true">'+ val+'</span>'
            let elem = $('<li class="toDoItem"></li>').html(htmlString);
            elem.append('<i class="trash far fa-trash-alt"></i>');
            elem.append('<i class="start fas fa-play"></i>');
            $('#toDoList').append(elem);
            $('#placeHolderToDo').addClass('hidden');
            $('#input').val('');
            obj = {task:val, timeStamp:Date.now()};
            $(toDoTasks).add(obj);
            console.log(toDoTasks); 
            if(toDoTasks.length > 1){
                $('.deleteAll').removeClass('hidden');
            }
        }
    }

    function handleButtons(e){
        let target = $(e.target);
        if(target.hasClass('start')){
            startToDo(e);
            version +=1;
        }
        if(target.hasClass('trash')){
            deleteToDo(e);
            version +=1;
        }
        if(target.hasClass('edit')){
            editToDo(e);
            version +=1;
        }
        if(target.hasClass('finish')){
            finishDoing(e);
            version +=1;
        }
    }

    function deleteToDo(e){
        let item = $(e.target).parent();
        item.remove();
        version +=1;
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
        version +=1;
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
        version +=1;
        doingTasks.pop();
        if(doingTasks.length == 0)$('#placeHolderDoing').removeClass('hidden');
        doneTasks = $('#doneList>li').get();
     }

    function handleDeleteAll(){
        $('#toDoList').remove();
        $(this).addClass('hidden');
        $('#placeHolderDone').removeClass("hidden");
        version +=1;
        toDoTasks = [];
    }

    function clearThePage(e){
        $('li').remove();
        $('#placeHolderToDo').removeClass("hidden");
        $('#placeHolderDoing').removeClass("hidden");
        $('#placeHolderDone').removeClass("hidden");
        version +=1;
    }
   
});

// indexedDB ***************************************************

var idbApp = (function() {
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    var dbPromise = idb.open('tasks', 3, function(upgradeDb){
        switch(upgradeDb.oldVersion){
            case 0:
                // a placeholder case so that the switch block will
                // execute when the database is first created
                // (oldVersion is 0)
            case 1 :
                console.log('Creating the todos object store');
                upgradeDb.createObjectStore('todos', {keyPath:'timestamp'});
            case 2 :
                console.log('Creating the doing object store');
                upgradeDb.createObjectStore('doings', {keyPath: 'timeStamp'});
            case 3 :
                console.log('Creating the done object store');
                upgradeDb.createObjectStore('dones)', {keyPath: 'timeStamp'});
        }
    })
})();
    
    

