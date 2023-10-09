let emojiUnicodeArray = []; //array for emoji unicodes
let emojisUnicodeCategory = [];// array for emoji unicode category
let summernoteEditor = null; //summernote editor div
let letterCount = 0
$(document).ready(function() {
//////////////////////////////// emoji functionality //////////////////////////////////////////

/**
 * async function to retrieve the emoji categories and the emoji unicodes 
 * from https://emoji-api.com 
 */
async function fetchCategoriesAndEmojis() {
    try {
      const categories = await $.ajax({
        url: 'https://emoji-api.com/categories?access_key=faf0432c18282e92ff66ea49f432dd40c35849a1',
        async: true,
      });
  
      for (const category of categories) {
        emojisUnicodeCategory = [];
        let counter = 0;
  
        const emojis = await $.ajax({
          url: `https://emoji-api.com/categories/${category.slug}?access_key=faf0432c18282e92ff66ea49f432dd40c35849a1`,
          async: true,
        });
  
        if (emojis != null && emojis.length > 0) {
          for (const emojiObject of emojis) {
            emojisUnicodeCategory.push(emojiObject.character);
            counter++;
            if (counter === 50) {
              break;
            }
          }
  
        }
        if (emojisUnicodeCategory.length > 0) {
          emojiUnicodeArray.push(emojisUnicodeCategory);
        }
  
      }
      summernoteEditor = $('div.note-editable.card-block');
      showEmojis()    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchCategoriesAndEmojis();
  
  // click listener for the emoji button on summernote editor
  $('#emoji-popup-btn').click(function(){
          $("#emoji-modal").show()
          $(".hide-modal").show()

  });
  
  
  
  // Unbind and rebind the click event to prevent multiple click handlers
  $(document).off('click', '.emoji').on('click', '.emoji', addToTextField);
  
  /**
   * Adds the emojis to the emoji pop-up
   */
  function showEmojis(){
  
    for(let i = 0; i<emojiUnicodeArray.length; i++){
        // Create a new <li> element
        let imgLi = $("<li>");
        let emojiUnicode = emojiUnicodeArray[i][0];
        emojiHeaderImageUrl = twemoji.parse(emojiUnicode);
        // Create a jQuery object from the HTML string
        const $emojiImage = $(emojiHeaderImageUrl);
        // Add a data attribute to the image element
        $emojiImage.attr('data-num', i);
        // Append the <img> element to the <li> element
        imgLi.append($emojiImage);
        // Append the <li> element to the '.emoji-Header' container
        $('.emoji-header').append(imgLi);
    }

        for(const emojiUnicode of emojiUnicodeArray[0]){
            let imgLi2 = $("<li>");
            let emojiBody = twemoji.parse(emojiUnicode);
            // Append the <img> element to the <li> element
            imgLi2.append(emojiBody);
            // Append the <li> element to the '.emoji-body' container
            $('.emoji-body').append(imgLi2);
    }
    //summernoteEditor.html("")// clears the <br> from summernote editor 
    summernoteEditor.focus()//sets the cursor in the editor

    
      // check if user tryin to tag another user
      summernoteEditor.on('input', function () {
        tagUser()

        letterCount++
        if(letterCount % 76 === 0 && summernoteEditor.find('p').length === 0){
          letterCount = 0
          $('div.note-editable.card-block p').append("<p>")
          
        }
      });
  };
  
  
  /**
   * Adds the emoji to the text editor if it doesn't
   * have a dataset if it does it changes the selection of emoji's.
   * The emoji's in the header section of the emoji pop-up have datasets 
   * and the emoji's in the body don't
   * @param {click} event emoji clicked
   */
  function addToTextField(event) {
    // Access the dataset.num property of the clicked element
    const num = parseInt(event.currentTarget.dataset.num);
    
    if (num >= 0 && num <= emojiUnicodeArray.length) {
        
        $('.emoji-body li').each(function(index) {

            // Create a new <img> element with the new image source
            let newImg = twemoji.parse(emojiUnicodeArray[num][index]);

            // Replace the existing <img> element with the new one
            $(this).find('img').replaceWith(newImg);
            
        });

    } else {

        // clone the img tag with the emoji link
        let emojiImg = $(event.target).clone();
        summernoteEditor.append(emojiImg);

        // Move the cursor to the end of the summernote editor
        moveCursorToEndOfsummerNoteTextArea(summernoteEditor[0]);  
        //hide emoji pop up
        $(".popup").hide()  
        $(".hide-modal").hide()
        //remove the placeholder from summernote when emoji added
        $('div.note-placeholder').attr('style' , 'none !important');
    }
  }
  
  /**
   * Puts the cursor after the last input in the 
   * summernote editor
   * @param {text} summerNoteTextArea  text in the editor
   */
  function moveCursorToEndOfsummerNoteTextArea(summerNoteTextArea) {
      const range = document.createRange();
      range.selectNodeContents(summerNoteTextArea);
      range.collapse(false); // Collapse the range to the end
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  }
  
//////////////////////////////// tagging functionality using @ //////////////////////////////////////////

  $('#at-symbol').click(function(){   
   $('div.note-editable.card-block p').append('@');
    tagUser()
    moveCursorToEndOfsummerNoteTextArea( $('div.note-editable.card-block')[0])
     //remove the placeholder from summernote when emoji added
     $('div.note-placeholder').attr('style' , 'none !important');
  });
  
  
  function tagUser() {
    let nameSuggestions = channelUsers;;
    let snText = $('div.note-editable.card-block p').text();
    let atIndex = snText.lastIndexOf("@");
     // Check if "@" was the last character entered and the character before it is not a letter or symbol
    if (snText.slice(-1) === '@' &! /[A-Za-z\d]/.test(snText.slice( -2, -1))) {
      $("#tag-name-modal").show()

      $(".hide-modal").show()       
      
    }
    $(".users").empty()
     
    
      const searchText = snText.slice(atIndex + 1);
      
      const matchingNames = nameSuggestions.filter(name =>
          name.toLowerCase().startsWith(searchText.toLowerCase())
      );

      // Display matching names as suggestions
      $.each(matchingNames, function(index, name) {

          const suggestion = $("<button>").text(name);
          suggestion.on("click", function() {
              // Replace the typed text with the selected name
              const newText = snText.slice(0, atIndex + 1) + name + " ";
              $('div.note-editable.card-block p').html(newText)
              moveCursorToEndOfsummerNoteTextArea( $('div.note-editable.card-block')[0])

              $("#tag-name-modal").hide()

              $(".hide-modal").hide()
          });
          
          $(".users").append(suggestion);
      });
  }
    

  $(".hide-modal").click(function(){
    $("#emoji-modal").hide()
      $("#tag-name-modal").hide()
    $(".hide-modal").hide()
    tagnamesAcctive = false
  })
  });
