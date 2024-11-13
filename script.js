$(document).ready(function() {
    $('#loading').hide();

    $('#new-quote').click(function() {
        var category = 'happiness';
        $('#loading').show();
        var dotCount = 0;
        var dotInterval = setInterval(function() {
            // Loading dots
            dotCount++;
            var dots = '.'.repeat(dotCount % 4);
            $('#dots').text(dots);
        }, 500);

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
            headers: { 'X-Api-Key': 'YourAPIKeyHere' },  // Replace with your own API key
            contentType: 'application/json',
            success: function(result) {

                clearInterval(dotInterval);
                $('#loading').hide(); // Hide loading text

                var quoteText = result[0].quote;
                var quoteAuthor = result[0].author || "Unknown";

                $('#quote').text('"' + quoteText + '"');
                $('#author').text('- ' + quoteAuthor);
            },
            error: function(jqXHR) {
                // Handle any errors during the API request
                console.error('Error: ', jqXHR.responseText);
                $('#loading').hide();
                $('#quote').text("Could not fetch a new quote. Please try again.");
                $('#author').text(""); // Clear author in case of error
            }
        });
    });

    // Dark mode toggle functionality
    $('#mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        
        // Toggle sun/moon emoji based on the mode
        if ($('body').hasClass('dark-mode')) {
            $('#mode-toggle').text('🌞');
        } else {
            $('#mode-toggle').text('🌙');
        }
    });
});