// function setCookie (name, value, days) {
//   var expires = ''
//   if (days) {
//     var date = new Date()
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
//     expires = '; expires=' + date.toUTCString()
//   }
//   document.cookie = name + '=' + (value || '') + expires + '; path=/'
// }

// function getCookie (name) {
//   var nameEQ = name + '='
//   var ca = document.cookie.split(';')
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i]
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length)
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
//   }
//   return null
// }

// function eraseCookie (name) {
//   document.cookie = name + '=; Max-Age=-99999999;'
// }

(function (window, $, _, Fiber, Fuse, hljs, gtag) {
  $(function (window) {
    // function handleExperiments () {
    //   // Define JavaScript for each page variation of this experiment.
    //   var pageVariations = [
    //     function () { // Original
    //       $('#exp-original').show()
    //     },
    //     function () { // Variation 1
    //       $('#exp-variation-1').show()
    //     }
    //   ]
    //   // Execute the chosen view
    //   pageVariations[chosenVariation]()
    //   $('#newsletter-form').show()
    // }

    // handleExperiments()

    // var cookie = getCookie('subscription')
    // if (cookie !== 'closed' && cookie !== 'subscribed') {
    //   var $newletterbar = $('#newsletter-bar')
    //   setTimeout(function () {
    //     $newletterbar.addClass('visible')
    //   }, 3000)

    //   $('#btn-newsletter-bar-close').click(function () {
    //     setCookie('subscription', 'closed', 50)
    //     $newletterbar.removeClass('visible')
    //   })
    // }

    // Mixins
    var Mixins = {}
    Mixins.Event = function (base) {
      return {
        _hook: function () {
          if (!this._$hook) {
            this._$hook = $({})
          }
          return this._$hook
        },
        on: function () {
          var hook = this._hook()
          hook.on.apply(hook, arguments)
        },
        off: function () {
          var hook = this._hook()
          hook.off.apply(hook, arguments)
        },
        trigger: function () {
          var hook = this._hook()
          hook.trigger.apply(hook, arguments)
        }
      }
    }

    // Core
    var App = {}

    App.Options = Fiber.extend(function () {
      return {
        init: function () {
          this.setupNodes()
          this.bindEvents()
          this.data = {}

          _.each(this.checkboxItems, _.bind(function (item) {
            this.setupCheckboxItems(item, false)
          }, this))

          _.each(this.rangeItems, _.bind(function (item) {
            this.setupRangeItems(item, false)
          }, this))

          this.setupKeys(false)

          //this.setupIdentifier(false)

          // this.setupPatternLength(false)
        },
        setupNodes: function () {
          this.$isCaseSensitiveCheckbox = $('#caseSensitiveCheckbox')
          this.$scoreCheckbox = $('#scoreCheckbox')
          this.$matchesCheckbox = $('#matchesCheckbox')
          this.$sortCheckbox = $('#sortCheckbox')
          // this.$tokenizeCheckbox = $('#tokenizeCheckbox')
          this.$useExtendedSearchCheckbox = $('#useExtendedSearchCheckbox')
          // this.$matchAllTokensCheckbox = $('#matchAllTokensCheckbox')
          // this.$identifierTextbox = $('#identifierTextbox')

          this.$locationRange = $('#locationRange')
          this.$thresholdRange = $('#thresholdRange')
          this.$distanceRange = $('#distanceRange')
          // this.$maxPatternLength = $('#maxPatternLength')
          this.$keysTextbox = $('#keysTextbox')
          this.$minMatchCharLengthRange = $('#minMatchCharLengthTextbox')
          this.$findAllMatchesCheckbox = $('#findAllMatchesCheckbox')

          this.checkboxItems = [{
            node: this.$isCaseSensitiveCheckbox,
            name: 'isCaseSensitive'
          }, {
            node: this.$sortCheckbox,
            name: 'shouldSort'
          }/*, {
            node: this.$tokenizeCheckbox,
            name: 'tokenize'
          }, {
            node: this.$matchAllTokensCheckbox,
            name: 'matchAllTokens'
          }*/, {
            node: this.$useExtendedSearchCheckbox,
            name: 'useExtendedSearch'
          }, {
            node: this.$scoreCheckbox,
            name: 'includeScore'
          }/*, {
            node: this.$matchAllTokensCheckbox,
            name: 'matchAllTokens'
          }*/, {
            node: this.$matchesCheckbox,
            name: 'includeMatches'
          }]

          this.rangeItems = [{
            node: this.$thresholdRange,
            name: 'threshold'
          }, {
            node: this.$locationRange,
            name: 'location'
          }, {
            node: this.$distanceRange,
            name: 'distance'
          }, {
            node: this.$minMatchCharLengthRange,
            name: 'minMatchCharLength'
          }]
        },
        bindEvents: function () {
          // Checkboxes
          _.each(this.checkboxItems, _.bind(function (item) {
            item.node.on('change', _.bind(function () {
              this.setupCheckboxItems(item, true)
            }, this))
          }, this))

          // Ranges
          _.each(this.rangeItems, _.bind(function (item) {
            item.node.on('change', _.bind(function () {
              this.setupRangeItems(item, true)
            }, this))
          }, this))

          // this.$identifierTextbox.on('change', _.bind(this.setupIdentifier, this))

          // keys
          this.$keysTextbox.on('change', _.bind(this.setupKeys, this))

          // Pattern length
          // this.$maxPatternLength.on('change', _.bind(this.setupPatternLength, this))

          // Google events
          this.$isCaseSensitiveCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:case-sensitive'
            })
          })
          this.$scoreCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:score'
            })
          })
          this.$matchesCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:matches'
            })
          })
          this.$sortCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:sort'
            })
          })
          // this.$tokenizeCheckbox.on('change', function () {
          //   gtag('event', 'change', {
          //     'event_category': 'Demo',
          //     'event_label': 'option:tokenize'
          //   })
          // })
          this.$useExtendedSearchCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:used-extended-search'
            })
          })
          // this.$matchAllTokensCheckbox.on('change', function () {
          //   gtag('event', 'change', {
          //     'event_category': 'Demo',
          //     'event_label': 'option:match-all-tokens'
          //   })
          // })
          // this.$identifierTextbox.on('change', function () {
          //   gtag('event', 'change', {
          //     'event_category': 'Demo',
          //     'event_label': 'option:identifier'
          //   })
          // })
          this.$keysTextbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:keys'
            })
          })
          this.$findAllMatchesCheckbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:find-all-matches'
            })
          })
          this.$minMatchCharLengthRange.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'option:min-match-char-length'
            })
          })
        },
        setupCheckboxItems: function (item, trigger) {
          var checked = item.node.prop('checked')
          this.data[item.name] = checked
          if (trigger || trigger === undefined) {
            this.trigger('change')
          }
        },
        setupRangeItems: function (item, trigger) {
          var value = item.node.val()
          this.data[item.name] = parseFloat(value)
          if (trigger || trigger === undefined) {
            this.trigger('change')
          }
        },
        // setupIdentifier: function (trigger) {
        //   this.data.id = this.$identifierTextbox.val()
        //   if (trigger) {
        //     this.trigger('change')
        //   }
        // },
        setupKeys: function (trigger) {
          var text = this.$keysTextbox.val()
          this.data.keys = eval(text)
          if (trigger) {
            this.trigger('change')
          }
        }
        // setupPatternLength: function (trigger) {
        //   var value = this.$maxPatternLength.val()
        //   this.data['maxPatternLength'] = parseInt(value)
        //   if (trigger || trigger === undefined) {
        //     this.trigger('change')
        //   }
        // }
      }
    })
    Fiber.mixin(App.Options, Mixins.Event)

    App.Main = new (Fiber.extend(function () {
      return {
        init: function () {
          this.setupNodes()
          this.bindEvents()
          this.setupItems()
        },
        setupNodes: function () {
          this.$itemsTextArea = $('#itemsTextArea')
          this.$searchTextbox = $('#searchTextbox')
          this.$resultTextArea = $('#resultTextArea')
          this.$jsTextArea = $('#jsTextArea')
          this.$searchTimeLabel = $('#searchTimeLabel')
        },
        bindEvents: function () {
          this.options = new App.Options()
          this.options.on('change', _.bind(this.setupFuse, this))
          this.$itemsTextArea.on('change', _.bind(this.setupItems, this))

          this.$searchTextbox.on('keyup', _.debounce(_.bind(function () {
            this.search(this.$searchTextbox.val())
          }, this), 0))

          this.$itemsTextArea.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'items'
            })
          })
          this.$searchTextbox.on('change', function () {
            gtag('event', 'change', {
              'event_category': 'Demo',
              'event_label': 'search'
            })
          })
        },
        setupItems: function () {
          var list = this.$itemsTextArea.val()
          this.list = eval(list)
          this.setupFuse()
        },
        setupFuse: function () {
          this.fuse = new Fuse(this.list, this.options.data)
          this.search(this.$searchTextbox.val())
        },
        search: function (pattern) {
          // if (pattern.length > this.options.data.maxPatternLength) {
          //   this.$resultTextArea.html('Pattern length is too long')
          //   return
          // }
          this.pattern = pattern
          var start = new Date().getTime()
          var result = this.fuse.search(pattern)
          var end = new Date().getTime()
          this.$searchTimeLabel.text((end - start) + ' ms')
          this.$resultTextArea.html(JSON.stringify(result, null, '  '))
          this.updateJS()
        },
        updateJS: function () {
          var arr = []
          arr.push('let options = {')
          // if (this.options.data.id) {
          //   arr.push('  id: "' + this.options.data.id + '",')
          // }
          if (this.options.data.isCaseSensitive) {
            arr.push('  isCaseSensitive: ' + this.options.data.isCaseSensitive + ',')
          }
          if (this.options.data.shouldSort) {
            arr.push('  shouldSort: ' + this.options.data.shouldSort + ',')
          }
          // if (this.options.data.tokenize) {
          //   arr.push('  tokenize: ' + this.options.data.tokenize + ',')
          // }
          // if (this.options.data.matchAllTokens) {
          //   arr.push('  matchAllTokens: ' + this.options.data.matchAllTokens + ',')
          // }
          if (this.options.data.findAllMatches) {
            arr.push('  findAllMatches: ' + this.options.data.findAllMatches + ',')
          }
          if (this.options.data.useExtendedSearch) {
            arr.push('  useExtendedSearch: ' + this.options.data.useExtendedSearch + ',')
          }
          if (this.options.data.includeScore) {
            arr.push('  includeScore: ' + this.options.data.includeScore + ',')
          }
          if (this.options.data.includeMatches) {
            arr.push('  includeMatches: ' + this.options.data.includeMatches + ',')
          }
          arr.push('  threshold: ' + this.options.data.threshold + ',')
          arr.push('  location: ' + this.options.data.location + ',')
          arr.push('  distance: ' + this.options.data.distance + ',')
          // arr.push('  maxPatternLength: ' + this.options.data.maxPatternLength + ',')
          arr.push('  minMatchCharLength: ' + this.options.data.minMatchCharLength + ',')
          if (this.options.data.keys) {
            arr.push('  keys: [')
            var len = this.options.data.keys.length
            var i = 0
            _.each(this.options.data.keys, function (value) {
              arr.push('    "' + value + (i === len - 1 ? '"' : '",'))
              i += 1
            })
            arr.push('  ]')
          }
          arr.push('};')
          arr.push('let fuse = new Fuse(list, options); // "list" is the item array')
          arr.push('let result = fuse.search("' + this.pattern + '");')
          arr = arr.join('\n')
          this.$jsTextArea.html(arr)
          hljs.highlightBlock(this.$jsTextArea[0])
        }
      }
    }))()
  })
})(window, $, _, Fiber, Fuse, hljs, gtag)
