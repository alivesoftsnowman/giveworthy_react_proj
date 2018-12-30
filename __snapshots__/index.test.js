exports['<Routes /> should match snapshot 1'] = {
  "node": {
    "nodeType": "host",
    "type": "div",
    "props": {
      "children": [
        {
          "key": null,
          "ref": null,
          "props": {
            "exact": true,
            "path": "/login"
          },
          "_owner": null,
          "_store": {}
        },
        {
          "key": null,
          "ref": null,
          "props": {
            "children": [
              {
                "key": null,
                "ref": null,
                "props": {
                  "from": "/",
                  "to": "/dashboard",
                  "exact": true,
                  "push": false
                },
                "_owner": null,
                "_store": {}
              },
              {
                "key": null,
                "ref": null,
                "props": {
                  "exact": true,
                  "path": "/dashboard"
                },
                "_owner": null,
                "_store": {}
              }
            ]
          },
          "_owner": null,
          "_store": {}
        }
      ]
    },
    "ref": null,
    "instance": null,
    "rendered": [
      {
        "nodeType": "class",
        "props": {
          "exact": true,
          "path": "/login"
        },
        "ref": null,
        "instance": null,
        "rendered": null
      },
      {
        "nodeType": "class",
        "props": {
          "children": [
            {
              "key": null,
              "ref": null,
              "props": {
                "from": "/",
                "to": "/dashboard",
                "exact": true,
                "push": false
              },
              "_owner": null,
              "_store": {}
            },
            {
              "key": null,
              "ref": null,
              "props": {
                "exact": true,
                "path": "/dashboard"
              },
              "_owner": null,
              "_store": {}
            }
          ]
        },
        "ref": null,
        "instance": null,
        "rendered": [
          {
            "nodeType": "class",
            "props": {
              "from": "/",
              "to": "/dashboard",
              "exact": true,
              "push": false
            },
            "ref": null,
            "instance": null,
            "rendered": null
          },
          {
            "nodeType": "class",
            "props": {
              "exact": true,
              "path": "/dashboard"
            },
            "ref": null,
            "instance": null,
            "rendered": null
          }
        ]
      }
    ]
  },
  "type": "div",
  "props": {},
  "children": [
    {
      "node": {
        "nodeType": "class",
        "props": {
          "exact": true,
          "path": "/login"
        },
        "ref": null,
        "instance": null,
        "rendered": null
      },
      "type": "Route",
      "props": {
        "exact": true,
        "path": "/login"
      },
      "children": null
    },
    {
      "node": {
        "nodeType": "class",
        "props": {
          "children": [
            {
              "key": null,
              "ref": null,
              "props": {
                "from": "/",
                "to": "/dashboard",
                "exact": true,
                "push": false
              },
              "_owner": null,
              "_store": {}
            },
            {
              "key": null,
              "ref": null,
              "props": {
                "exact": true,
                "path": "/dashboard"
              },
              "_owner": null,
              "_store": {}
            }
          ]
        },
        "ref": null,
        "instance": null,
        "rendered": [
          {
            "nodeType": "class",
            "props": {
              "from": "/",
              "to": "/dashboard",
              "exact": true,
              "push": false
            },
            "ref": null,
            "instance": null,
            "rendered": null
          },
          {
            "nodeType": "class",
            "props": {
              "exact": true,
              "path": "/dashboard"
            },
            "ref": null,
            "instance": null,
            "rendered": null
          }
        ]
      },
      "type": "Switch",
      "props": {},
      "children": [
        {
          "node": {
            "nodeType": "class",
            "props": {
              "from": "/",
              "to": "/dashboard",
              "exact": true,
              "push": false
            },
            "ref": null,
            "instance": null,
            "rendered": null
          },
          "type": "Redirect",
          "props": {
            "from": "/",
            "to": "/dashboard",
            "exact": true,
            "push": false
          },
          "children": null
        },
        {
          "node": {
            "nodeType": "class",
            "props": {
              "exact": true,
              "path": "/dashboard"
            },
            "ref": null,
            "instance": null,
            "rendered": null
          },
          "type": "Connect(AuthenticatedRoute)",
          "props": {
            "exact": true,
            "path": "/dashboard"
          },
          "children": null
        }
      ]
    }
  ]
}
