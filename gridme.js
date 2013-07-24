(function($) {
  $.fn.gridme = function(options) {

    var
      defaults = {
        containerWidth: 960,
        gridMargin:     10,
        gutterWidth:    20,
        colNumber:      8,
        lineHeight:      20,
        guideColor:     'rgba(76,255,255,0.5)',
        columnGrid:     true,
        baselineGrid:   true
      },

      settings  = $.extend({}, defaults, options),

      docHeight = $(document).outerHeight(),
      colWidth  = (settings.containerWidth - (settings.gridMargin * 2) - settings.gutterWidth * (settings.colNumber - 1)) / settings.colNumber
      rowNumber = Math.floor(docHeight / settings.lineHeight),

      style_outerWrapper = {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 999
      },

      style_colContainer = {
        height: docHeight,
        margin: '0 auto',
        outlineColor: settings.guideColor,
        outlineWidth: 1,
        outlineStyle: 'solid',
        padding: '0 ' + settings.gridMargin + 'px',
        width: settings.containerWidth
      },

      style_col = {
        borderColor: settings.guideColor,
        borderWidth: 1,
        borderStyle: 'solid',
        height: '100%',
        float: 'left',
        marginRight: settings.gutterWidth,
        width: colWidth
      },

      style_gridRow = {
        height: settings.lineHeight,
        borderBottom: 'dotted 1px rgba(254,45,255,0.5)'
      }

    // On load

    if ( settings.columnGrid == true ) initColumnGrid()
    if ( settings.baselineGrid == true ) initBaselineGrid()

    // Page interactions

    $(document).on('keydown', function(e) {
      if (keyCode(e) == 74 && e.metaKey) shifGrid('+')
      if (keyCode(e) == 75 && e.metaKey) shifGrid('-')
    })

    // Functions

    function shifGrid(sign) {
      $('#row-wrapper').css('top', sign + '=1px')
    }

    function keyCode(event) {
      return event.keyCode || event.which
    }

    function initColumnGrid() {
      $('<div id="col-wrapper" />')
          .prependTo('html')
          .css(style_outerWrapper)

      $('<div id="col-container" />')
          .prependTo('#col-wrapper')
          .css(style_colContainer)

      appendCols()
    }

    function appendCols() {
      for (var i = 0; i < settings.colNumber; i++)
        {
          if ( i == settings.colNumber - 1 ) {
            style_col = $.extend({}, style_col, {marginRight: 0})
          }
          $('<div class="col" />')
            .appendTo('#col-container')
            .css(style_col)
        }
    }

    function initBaselineGrid() {
      $('<div id="row-wrapper" />')
          .prependTo('html')
          .css(style_outerWrapper)

      buildRows()
    }

    function buildRows() {
      for (var i = 0; i < rowNumber; i++)
        {
          $('<div class="grid-row" />')
            .appendTo('#row-wrapper')
            .css(style_gridRow)
        }
    }

    return this
  }
})(jQuery)
