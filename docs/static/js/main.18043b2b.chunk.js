;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    17: function(e, t, r) {
      e.exports = r(55)
    },
    53: function(e, t, r) {},
    54: function(e, t, r) {},
    55: function(e, t, r) {
      'use strict'
      r.r(t)
      var n = r(0),
        o = r.n(n),
        a = r(10),
        i = r.n(a),
        s = r(13),
        c = r(2),
        l = r(3),
        d = r.n(l),
        u = r(6),
        b = r(11),
        m = r(15),
        p = r(12),
        g = r(16),
        h = r(14),
        v = function(e) {
          return Math.floor(Math.random() * e)
        },
        f = function(e, t) {
          var r = [],
            n = e * t
          for (var o in Object(h.a)(Array(n))) {
            var a = parseInt(o, 10)
            r.push({
              id: a,
              row: Math.floor(a / t),
              column: a % t,
              hasBomb: !1,
              hasFlag: !1,
              dangerLevel: 0,
              isHovered: !1,
              isVisible: !1,
              neighbors: []
            })
          }
          return r
        },
        E = function(e, t, r, n, o) {
          for (var a = 0; a < n; ) {
            var i = x(e, t, r, o)
            e[i].hasBomb ||
              ((e[i] = Object(c.a)({}, e[i], { hasBomb: !0, explode: !1 })),
              (a += 1))
          }
          return e
        },
        x = function(e, t, r, n) {
          var o = t * r
          if (n) {
            for (
              var a = [
                  e[0].id,
                  e[r - 1].id,
                  e[(t - 1) * r].id,
                  e[e.length - 1].id
                ],
                i = !1,
                s = null;
              !i;

            )
              (s = v(o)), a.includes(s) || (i = !0)
            return s
          }
          return v(o)
        },
        C = function(e, t, r) {
          return e.map(function(e) {
            var n = e.neighbors
            return (
              F(e) && B(e) && n.push(e.id - r - 1),
              F(e) && n.push(e.id - r),
              F(e) && w(e, r) && n.push(e.id - r + 1),
              B(e) && n.push(e.id - 1),
              w(e, r) && n.push(e.id + 1),
              y(e, t) && B(e) && n.push(e.id + r - 1),
              y(e, t) && n.push(e.id + r),
              y(e, t) && w(e, r) && n.push(e.id + r + 1),
              Object(c.a)({}, e, { neighbors: n })
            )
          })
        },
        O = function(e) {
          return (
            e.forEach(function(t) {
              t.dangerLevel = j(e, t)
            }),
            e
          )
        },
        j = function(e, t) {
          var r = 0
          return (
            t.neighbors.forEach(function(t) {
              r = e[t].hasBomb ? r + 1 : r
            }),
            r
          )
        },
        F = function(e) {
          return e.row - 1 >= 0
        },
        y = function(e, t) {
          return e.row + 1 < t
        },
        B = function(e) {
          return e.column - 1 >= 0
        },
        w = function(e, t) {
          return e.column + 1 < t
        },
        k = o.a.createContext(),
        S = { ready: 0, playing: 1, gameover: 2, victory: 3 },
        A = {
          Beginner: { rows: 9, columns: 9 },
          Intermediate: { rows: 16, columns: 16 },
          Expert: { rows: 16, columns: 30 }
        },
        L = { Beginner: 10, Intermediate: 40, Expert: 99 },
        T = (function(e) {
          function t() {
            var e, r
            Object(b.a)(this, t)
            for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
              a[i] = arguments[i]
            return (
              ((r = Object(m.a)(
                this,
                (e = Object(p.a)(t)).call.apply(e, [this].concat(a))
              )).state = {
                bombs: 10,
                bombsRemaining: 10,
                cellsToDiscover: 71,
                cheat: { cleanBorders: !1, hover: !1 },
                columns: 9,
                grid: [],
                rows: 9,
                status: S.ready,
                selectedLevel: 'Beginner',
                time: 0
              }),
              (r.timer = function() {}),
              (r.componentDidMount = function() {
                return r.startGrid()
              }),
              (r.startGrid = Object(u.a)(
                d.a.mark(function e() {
                  var t, n, o, a, i, s
                  return d.a.wrap(function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (t = r.state),
                            (n = t.columns),
                            (o = t.rows),
                            (a = t.bombs),
                            (i = t.cheat),
                            (s = f(o, n)),
                            (s = E(s, o, n, a, i.cleanBorders)),
                            (s = C(s, o, n)),
                            (s = O(s)),
                            (e.next = 7),
                            r.setState({ grid: s })
                          )
                        case 7:
                          return e.abrupt('return', e.sent)
                        case 8:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })
              )),
              (r.restartGame = Object(u.a)(
                d.a.mark(function e() {
                  return d.a.wrap(function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            r.stopTimer(),
                            r.setState({
                              bombsRemaining: L[r.state.selectedLevel],
                              cellsToDiscover:
                                r.state.rows * r.state.columns - r.state.bombs,
                              cheat: Object(c.a)({}, r.state.cheat, {
                                cleanBorders: !1
                              }),
                              status: S.ready,
                              time: 0
                            }),
                            (e.next = 4),
                            r.startGrid()
                          )
                        case 4:
                          return e.abrupt('return', e.sent)
                        case 5:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })
              )),
              (r.changeLevel = function(e) {
                r.setState({ selectedLevel: e }, r.restartGame)
                var t = L[e],
                  n = A[e],
                  o = n.rows,
                  a = n.columns
                r.setState({ bombs: t, columns: a, rows: o }, r.startGrid)
              }),
              (r.cellClicked = function(e) {
                var t = r.state.status
                if (t === S.ready || t === S.playing) {
                  var n = r.state.grid,
                    o = !0,
                    a = !1,
                    i = void 0
                  try {
                    for (
                      var s, c = e[Symbol.iterator]();
                      !(o = (s = c.next()).done);
                      o = !0
                    ) {
                      var l = s.value
                      if (l.isVisible) return
                      if (l.hasFlag) return
                      if (
                        ((n = r.changeCellToVisible(r.state.grid, l)),
                        l.hasBomb)
                      )
                        r.setState({ status: S.gameover }),
                          (n = r.clickedOnBomb(n, l))
                      else {
                        var d = r.updateCellsToDiscover(n)
                        r.verifyVictory(d)
                      }
                    }
                  } catch (u) {
                    ;(a = !0), (i = u)
                  } finally {
                    try {
                      o || null == c.return || c.return()
                    } finally {
                      if (a) throw i
                    }
                  }
                  t === S.ready &&
                    r.setState({ status: S.playing }, function() {
                      e.length > 1
                        ? r.startTimer()
                        : e[0].hasBomb || r.startTimer()
                    }),
                    r.setState({ grid: n })
                }
              }),
              (r.updateCellsToDiscover = function(e) {
                var t = r.state.cellsToDiscover,
                  n = !0,
                  o = !1,
                  a = void 0
                try {
                  for (
                    var i, s = e[Symbol.iterator]();
                    !(n = (i = s.next()).done);
                    n = !0
                  ) {
                    i.value.isVisible && (t -= 1)
                  }
                } catch (c) {
                  ;(o = !0), (a = c)
                } finally {
                  try {
                    n || null == s.return || s.return()
                  } finally {
                    if (o) throw a
                  }
                }
                return t
              }),
              (r.verifyVictory = function(e) {
                0 === e && (r.stopTimer(), r.setState({ status: S.victory }))
              }),
              (r.changeCellToVisible = function(e, t) {
                return (
                  (e[t.id] = Object(c.a)({}, t, { isVisible: !0 })),
                  0 !== t.dangerLevel ||
                    t.hasBomb ||
                    t.isVisible ||
                    t.neighbors.forEach(function(t) {
                      r.changeCellToVisible(e, e[t])
                    }),
                  e
                )
              }),
              (r.clickedOnBomb = function(e, t) {
                return (
                  r.stopTimer(),
                  (e[t.id] = Object(c.a)({}, t, {
                    isVisible: !0,
                    explode: !0
                  })),
                  (e = e.map(function(e) {
                    return e.hasBomb && !e.explode
                      ? Object(c.a)({}, e, { isVisible: !0 })
                      : e
                  }))
                )
              }),
              (r.toggleFlag = function(e, t) {
                if ((t.preventDefault(), !e.isVisible)) {
                  var n = r.state.grid,
                    o = n[e.id],
                    a = o.hasFlag
                      ? r.state.bombsRemaining + 1
                      : r.state.bombsRemaining - 1
                  ;(n[e.id] = Object(c.a)({}, o, { hasFlag: !o.hasFlag })),
                    r.setState({ bombsRemaining: a, grid: n })
                }
              }),
              (r.setHover = function(e, t) {
                if (r.state.cheat.hover) {
                  var n = r.state.grid
                  ;(n[e.id] = Object(c.a)({}, e, { isHovered: t })),
                    e.neighbors.forEach(function(e) {
                      n[e].isHovered = t
                    }),
                    r.setState({ grid: n })
                }
              }),
              (r.cleanBorders = function() {
                r.setState(
                  {
                    cheat: Object(c.a)({}, r.state.cheat, { cleanBorders: !0 })
                  },
                  Object(u.a)(
                    d.a.mark(function e() {
                      var t, n, o, a, i, s, c, l
                      return d.a.wrap(function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), r.restartGame()
                            case 2:
                              ;(t = r.state),
                                (n = t.columns),
                                (o = t.grid),
                                (a = t.rows),
                                (i = o[0]),
                                (s = o[n - 1]),
                                (c = o[(a - 1) * n]),
                                (l = o[o.length - 1]),
                                r.cellClicked([i, s, c, l])
                            case 8:
                            case 'end':
                              return e.stop()
                          }
                      }, e)
                    })
                  )
                )
              }),
              (r.toggleCheatHover = function() {
                var e = r.state.cheat
                r.setState({ cheat: Object(c.a)({}, e, { hover: !e.hover }) })
              }),
              (r.startTimer = function() {
                r.timer = setInterval(function() {
                  r.setState({ time: r.state.time + 1 })
                }, 1e3)
              }),
              (r.stopTimer = function() {
                clearInterval(r.timer)
              }),
              (r.render = function() {
                return o.a.createElement(
                  k.Provider,
                  {
                    value: {
                      bombsRemaining: r.state.bombsRemaining,
                      changeLevel: r.changeLevel,
                      cellClicked: r.cellClicked,
                      cheat: r.state.cheat,
                      cleanBorders: r.cleanBorders,
                      grid: r.state.grid,
                      isGameOver: r.state.status === S.gameover,
                      isVictory: r.state.status === S.victory,
                      restartGame: r.restartGame,
                      selectedLevel: r.state.selectedLevel,
                      time: r.state.time,
                      toggleCheatHover: r.toggleCheatHover,
                      toggleFlag: r.toggleFlag,
                      setHover: r.setHover
                    }
                  },
                  r.props.children
                )
              }),
              r
            )
          }
          return Object(g.a)(t, e), t
        })(o.a.Component),
        V = k,
        R = r(1),
        D = {
          alignItems: 'center',
          backgroundColor: '#DDDDDD',
          cursor: 'pointer',
          display: 'flex',
          fontWeight: 'bold',
          height: '2rem',
          justifyContent: 'center',
          maxHeight: '40px',
          maxWidth: '40px',
          position: 'relative',
          userSelect: 'none',
          width: '2rem'
        },
        N = {
          cell: Object(R.css)(
            Object(c.a)({}, D, {
              borderTop: '2px solid #EEEEEE',
              borderLeft: '2px solid #EEEEEE',
              borderBottom: '2px solid #555555',
              borderRight: '2px solid #555555',
              ':hover': { backgroundColor: '#EEEEEE' }
            })
          ),
          cellOver: Object(R.css)(
            Object(c.a)({}, D, {
              borderTop: '2px solid #EEEEEE',
              borderLeft: '2px solid #EEEEEE',
              borderBottom: '2px solid #555555',
              borderRight: '2px solid #555555'
            })
          ),
          cellVisible: Object(R.css)(
            Object(c.a)({}, D, {
              backgroundColor: '#CCCCCC',
              borderTop: '2px solid #555555',
              borderLeft: '2px solid #555555',
              borderBottom: '2px solid #CCCCCC',
              borderRight: '2px solid #CCCCCC'
            })
          ),
          cellHovered: Object(R.css)({ backgroundColor: '#90FC6F' }),
          cellExploded: Object(R.css)(
            Object(c.a)({}, D, {
              backgroundColor: '#F76767',
              borderTop: '2px solid #555555',
              borderLeft: '2px solid #555555',
              borderBottom: '2px solid #F76767',
              borderRight: '2px solid #F76767'
            })
          ),
          cellFlag: Object(R.css)(
            Object(c.a)({}, D, {
              borderTop: '2px solid #EEEEEE',
              borderLeft: '2px solid #EEEEEE',
              borderBottom: '2px solid #555555',
              borderRight: '2px solid #555555'
            })
          ),
          emoji: Object(R.css)({
            color: 'red',
            fontSize: '20px',
            height: '1.5rem'
          }),
          value: Object(R.css)({ fontSize: '22px' })
        },
        H = [
          '',
          '#4286F4',
          '#0BA51B',
          '#6E25DB',
          '#DB7325',
          '#E22FB6',
          '#D11F1F',
          '#398452',
          '#683B39'
        ],
        I = function(e, t) {
          return e.hasFlag
            ? N.cellFlag
            : e.isVisible && e.explode
            ? N.cellExploded
            : e.isVisible
            ? N.cellVisible
            : t
            ? N.cellOver
            : N.cell
        },
        G = function(e) {
          if (e.isHovered) return N.cellHovered
        },
        z = function(e) {
          return e.hasFlag
            ? '\ud83d\udea9'
            : e.isVisible
            ? e.hasBomb
              ? '\ud83d\udca3'
              : e.dangerLevel > 0
              ? e.dangerLevel
              : ''
            : ''
        },
        M = function(e) {
          var t = e.cell,
            r = Object(n.useContext)(V),
            a = r.isGameOver,
            i = r.cellClicked,
            s = r.toggleFlag,
            c = r.setHover
          return o.a.createElement(
            'td',
            {
              className: ''.concat(I(t, a), ' ').concat(G(t)),
              style: { color: H[t.dangerLevel] },
              onClick: i.bind(void 0, [t]),
              onContextMenu: s.bind(void 0, t),
              onMouseEnter: c.bind(void 0, t, !0),
              onMouseLeave: c.bind(void 0, t, !1)
            },
            o.a.createElement(
              'span',
              { className: t.hasBomb || t.hasFlag ? N.emoji : N.value },
              z(t)
            )
          )
        },
        W = {
          row: Object(R.css)({ display: 'flex', justifyContent: 'center' })
        },
        J = function(e) {
          var t = e.row
          return o.a.createElement(
            'tr',
            { className: W.row },
            t.map(function(e, t) {
              return o.a.createElement(M, { key: 'cell-'.concat(t), cell: e })
            })
          )
        },
        P = {
          grid: Object(R.css)({
            borderCollapse: 'collapse',
            borderTop: '2px solid #555555',
            borderLeft: '2px solid #555555',
            borderBottom: '2px solid #EEEEEE',
            borderRight: '2px solid #EEEEEE',
            height: '100%'
          })
        },
        q = function(e) {
          for (
            var t,
              r = ((t = function(e) {
                return e.row
              }),
              e.reduce(function(e, r) {
                var n = t(r)
                return e[n] ? e[n].push(r) : (e[n] = [r]), e
              }, {})),
              n = [],
              a = Object.entries(r),
              i = 0;
            i < a.length;
            i++
          ) {
            var c = a[i],
              l = Object(s.a)(c, 2),
              d = l[0],
              u = l[1]
            n.push(o.a.createElement(J, { key: 'row-'.concat(d), row: u }))
          }
          return n
        },
        K = function() {
          var e = Object(n.useContext)(V).grid
          return o.a.createElement(
            'table',
            { className: P.grid },
            o.a.createElement('tbody', null, q(e))
          )
        },
        Q = (r(53),
        function(e) {
          var t = e.checked,
            r = e.label,
            n = e.onChange
          return o.a.createElement(
            'label',
            { className: 'container' },
            r,
            o.a.createElement('input', {
              type: 'checkbox',
              checked: t,
              onChange: n
            }),
            o.a.createElement('span', { className: 'checkmark' })
          )
        }),
        U = {
          button: Object(R.css)({
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid #4286F4',
            borderRadius: '5px',
            color: '#4286F4',
            cursor: 'pointer',
            display: 'flex',
            fontSize: '16px',
            height: '30px',
            padding: '5px',
            ':hover': { backgroundColor: '#4286F4', color: '#FFFFFF' },
            ':focus': { outline: 'none' }
          })
        },
        X = function(e) {
          return o.a.createElement(
            'button',
            Object.assign({ className: U.button }, e),
            e.children
          )
        },
        Y = {
          menu: Object(R.css)({
            display: 'flex',
            listStyle: 'none',
            marginBottom: '30px'
          }),
          listItem: Object(R.css)({
            borderBottom: '2px solid #FFFFFF',
            cursor: 'pointer',
            marginRight: '20px',
            padding: '10px 0'
          }),
          listItemActive: Object(R.css)({ borderBottom: '2px solid #CCCCCC' })
        },
        Z = function(e) {
          var t = e.action,
            r = e.level,
            n = e.selectedLevel
          return o.a.createElement(
            'li',
            Object.assign(
              {},
              Object(R.css)(Y.listItem, r === n ? Y.listItemActive : ''),
              { onClick: t.bind(void 0, r) }
            ),
            r
          )
        },
        $ = function() {
          var e = Object(n.useContext)(V),
            t = e.changeLevel,
            r = e.selectedLevel
          return o.a.createElement(
            'ul',
            { className: Y.menu },
            ['Beginner', 'Intermediate', 'Expert'].map(function(e) {
              return o.a.createElement(Z, {
                action: t,
                key: e,
                level: e,
                selectedLevel: r
              })
            })
          )
        },
        _ = {
          container: Object(R.css)({ marginRight: '50px' }),
          wrapper: Object(R.css)({ marginBottom: '30px' }),
          info: Object(R.css)({
            color: '#4286F4',
            fontSize: '20px',
            fontWeight: 'bold'
          }),
          button: Object(R.css)({
            backgroundColor: '#FFFFFF',
            border: '1px solid #AAAAAA',
            borderRadius: '5px',
            color: '#AAAAAA',
            cursor: 'pointer',
            fontSize: '16px',
            height: '30px',
            padding: '5px',
            ':hover': { backgroundColor: '#AAAAAA', color: '#FFFFFF' },
            ':focus': { outline: 'none' }
          }),
          victory: Object(R.css)({
            color: '#4286F4',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px'
          }),
          cheatArea: Object(R.css)({
            border: '1px solid #BBBBBB',
            marginTop: '30px',
            padding: '10px',
            '> h1': { color: '#555555', fontSize: '20px', marginBottom: '10px' }
          })
        },
        ee = function() {
          var e = Object(n.useContext)(V),
            t = e.bombsRemaining,
            r = e.cheat,
            a = e.cleanBorders,
            i = e.isVictory,
            s = e.restartGame,
            c = e.time,
            l = e.toggleCheatHover
          return o.a.createElement(
            'div',
            { className: _.container },
            o.a.createElement($, null),
            o.a.createElement(
              'div',
              { className: _.wrapper },
              o.a.createElement(
                'div',
                { className: _.container },
                o.a.createElement(
                  'p',
                  null,
                  'Bombs remaining:',
                  ' ',
                  o.a.createElement('span', { className: _.info }, t)
                ),
                o.a.createElement(
                  'p',
                  null,
                  'Time: ',
                  o.a.createElement('span', { className: _.info }, c)
                )
              )
            ),
            o.a.createElement(X, { onClick: s }, 'Restart'),
            o.a.createElement(
              'div',
              { className: _.victory },
              i ? 'Victory :)' : ''
            ),
            o.a.createElement(
              'div',
              { className: _.cheatArea },
              o.a.createElement('h1', null, 'Cheat area'),
              o.a.createElement(Q, {
                checked: r.hover,
                label: 'Show hover',
                onChange: l
              }),
              o.a.createElement(X, { onClick: a }, 'Start with clean borders')
            )
          )
        },
        te = {
          app: Object(R.css)({
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px'
          })
        },
        re = function() {
          return o.a.createElement(
            'div',
            { className: te.app },
            o.a.createElement(
              T,
              null,
              o.a.createElement(ee, null),
              o.a.createElement(K, null)
            )
          )
        }
      r(54)
      i.a.render(o.a.createElement(re, null), document.getElementById('root'))
    }
  },
  [[17, 1, 2]]
])
//# sourceMappingURL=main.18043b2b.chunk.js.map
