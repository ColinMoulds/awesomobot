"use strict";

const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const express = require("express");

const schemas = require("../../db");

const router = express.Router();

let config;
try {

    config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "..", "config.json")));
} catch(err) {

    botLogger.fatalError(`error loading config: ${err}`);
}

router.get("/", (req, res) => {

    res.json({ data: "yay it works!" });
});

// Data search.
router.get("/logs", (req, res) => {

    // Api key checking.
    /*
    if (req.query.key === undefined || req.query.key !== config.api_key) {

        res.json({ err: "key error" });
        return;
    }
    */

    const limitDef = 20;
    const limitMax = 50;

    const pageDef = 0;

    const page = req.query.page === undefined ? pageDef : req.query.page;
    let limit = req.query.limit === undefined ? limitDef : parseInt(req.query.limit);
    
    if (isNaN(limit)) {
        limit = limitDef;
    }
    if (limit > limitMax) {
        limit = limitMax;
    }

    const type = req.query.type === undefined ? null : req.query.type;

    schemas.LogSchema
        .find({
            ...(type === null ? {} : { type })
        })
        .skip(page * limit).limit(limit)
        .select({
            _id: 0,
            __v: 0
        })
        .then(docs => {

            res.json(docs);
        })
        .catch(err => {

            res.json({ err });
        });
});

router.get("/scripts", (req, res) => {

    const limitDef = 10;
    const limitMax = 25;

    const pageDef = 0;

    const page = req.query.page === undefined ? pageDef : req.query.page;
    let limit = req.query.limit === undefined ? limitDef : parseInt(req.query.limit);
    
    if (isNaN(limit)) {
        limit = limitDef;
    }
    if (limit > limitMax) {
        limit = limitMax;
    }

    const local = req.query.local === undefined ? null : req.query.local === "true";
    const name = req.query.name === undefined ? null : req.query.name;
    //const author = req.query.author === undefined ? null : req.query.author;
    const type = req.query.type === undefined ? null : req.query.type;
    const permissions = req.query.permissions === undefined ? null : req.query.permissions;
    const match = req.query.match === undefined ? null : req.query.match;
    const match_type = req.query.match_type === undefined ? null : req.query.match_type;

    schemas.ScriptSchema
        .find({
            ...(local === null ? {} : { local }),
            ...(name === null ? {} : { name }),
            ...(type === null ? {} : { type }),
            ...(match === null ? {} : { match }),
            ...(match_type === null ? {} : { match_type })
        })
        .skip(page * limit)
        .limit(limit)
        .select({
            _id: 0,
            __v: 0
        })
        .then(docs => {

            docs = docs.filter(doc => {

                return permissions === null ? true : doc.permissions & permissions;
            });

            res.json(docs);
        })
        .catch(err => {

            res.json({ err });
        });
});

/*
// Data manipulation.
router.route("/guilds/:discord_id").get((req, res) => {

    schemas.GuildSchema
        .find({
            discord_id: req.params.discord_id
        })
        .select({
            _id: 0,
            __v: 0,
            "scripts._id": 0
        })
        .then(doc => {

            res.json(doc);
        })
        .catch(err => {

            res.json({ err });
        });

}).post((req, res) => {
    
    // needs api key
    // admin

}).put((req, res) => {
    
    // needs api key
    // admin
    // mod

}).patch((req, res) => {
    
    // needs api key
    // admin
    // mod

}).delete((req, res) => {
    
    // needs api key
    // admin
    // mod

});

router.route("/scripts/:object_id").get((req, res) => {

    schemas.ScriptSchema
        .find({
            _id: mongoose.Types.ObjectId(req.params.object_id)
        })
        .select({
            _id: 0,
            __v: 0
        })
        .then(doc => {

            res.json(doc);
        })
        .catch(err => {
            
            res.json({ err });
        });

}).post((req, res) => {

    // needs api key
    // admin
    // user

}).put((req, res) => {

    // needs api key
    // admin
    // user

}).patch((req, res) => {
    
    // needs api key
    // admin
    // user

}).delete((req, res) => {
    
    // needs api key
    // admin
    // user

});

router.post("/users", (req, res) => {


});
router.post("/users", async (req, res) => {

    // check type of token
    // - dev token
    // - user token

    // if dev token - verify - allow all access

    // if user token - fetch user schema

    const token = req.headers["xxx-access-token"] === undefined ? null : req.headers["xxx-access-token"];
    if (token === null || token !== config.api_token) {

        res.json({ err: 403 });
        return;
    }
    
    const discord_id = req.body.discord_id === undefined ? null : req.body.discord_id;
    if (discord_id === null) {

        res.json({ err: "field 'discord_id' is required" });
        return;
    }

    const api_token = req.body.api_token === undefined ? null : mongoose.Types.ObjectId(req.body.api_token);
    const scripts = req.body.scripts === undefined ? [] : req.body.scripts.map(e => mongoose.Types.ObjectId(e));

    if (scripts.length > 0) {

        const status = await schemas.ScriptSchema.find({ _id: { $in: scripts } }).then(docs => {

            if (docs.length !== scripts.length) {

                res.json({ err: "1 or more specified scripts doesnt exist" });
                return -1;
            }
            return 0;
        }).catch(err => {
    
            res.json({ err });
            return -1;
        });
        if (status === -1) {
            return;
        }
    }

    const user = new schemas.UserSchema({
        discord_id,
        api_token,
        scripts
    });

    user
        .save()
        .then(doc => {

            res.json({ message: "posted user successfully" });
        })
        .catch(err => {

            res.json({ err });
        });

});
router.route("/users/:discord_id").get((req, res) => {

    const token = req.headers["xxx-access-token"] === undefined ? null : req.headers["xxx-access-token"];
    if (token === null || token !== config.api_token) {

        res.json({ err: 403 });
        return;
    }

    schemas.UserSchema
        .find({
            discord_id: req.params.discord_id
        })
        .select({
            _id: 0,
            __v: 0
        })
        .then(doc => {

            res.json(doc);
        })
        .catch(err => {

            res.json({ err });
        });

}).put(async (req, res) => {
    
    const token = req.headers["xxx-access-token"] === undefined ? null : req.headers["xxx-access-token"];
    if (token === null || token !== config.api_token) {

        res.json({ err: 403 });
        return;
    }

    const api_token = req.body.api_token === undefined ? null : mongoose.Types.ObjectId(req.body.api_token);
    const scripts = req.body.scripts === undefined ? [] : req.body.scripts.map(e => mongoose.Types.ObjectId(e));

    if (scripts.length > 0) {

        const status = await schemas.ScriptSchema.find({ _id: { $in: scripts } }).then(docs => {

            if (docs.length !== scripts.length) {

                res.json({ err: "1 or more specified scripts doesnt exist" });
                return -1;
            }
            return 0;
        }).catch(err => {
    
            res.json({ err });
            return -1;
        });
        if (status === -1) {
            return;
        }
    }

    schemas.UserSchema
        .updateOne({
            discord_id: req.params.discord_id
        }, {
            api_token,
            scripts
        })
        .then(raw => {

            res.json({ message: "updated user successfully" });
        })
        .catch(err => {

            res.json({ err });
        });

}).patch(async (req, res) => {
    
    const token = req.headers["xxx-access-token"] === undefined ? null : req.headers["xxx-access-token"];
    if (token === null || token !== config.api_token) {

        res.json({ err: 403 });
        return;
    }

    const api_token = req.body.api_token === undefined ? null : mongoose.Types.ObjectId(req.body.api_token);
    const scripts = req.body.scripts === undefined ? null : req.body.scripts.map(e => mongoose.Types.ObjectId(e));

    if (scripts.length > 0) {

        const status = await schemas.ScriptSchema.find({ _id: { $in: scripts } }).then(docs => {

            if (docs.length !== scripts.length) {

                res.json({ err: "1 or more specified scripts doesnt exist" });
                return -1;
            }
            return 0;
        }).catch(err => {
    
            res.json({ err });
            return -1;
        });
        if (status === -1) {
            return;
        }
    }

    schemas.UserSchema
        .updateOne({
            discord_id: req.params.discord_id
        }, {
            ...(api_token === null ? {} : { api_token }),
            ...(scripts === null ? {} : { scripts })
        })
        .then(raw => {

            res.json({ message: "patched user successfully" });
        })
        .catch(err => {

            res.json({ err });
        });

}).delete((req, res) => {
    
    const token = req.headers["xxx-access-token"] === undefined ? null : req.headers["xxx-access-token"];
    if (token === null || token !== config.api_token) {

        res.json({ err: 403 });
        return;
    }

    schemas.UserSchema
        .deleteOne({
            discord_id: req.params.discord_id
        })
        .then(() => {

            res.json({ message: "deleted user successfully" });
        })
        .catch(err => {

            res.json({ err });
        });

});
*/

module.exports = router;