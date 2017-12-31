"use strict"

const express = require("express");
const router = express.Router();

const Server = require("../../common/models/server");

router.get("/", (req, res) => {
    res.render("dashboard/index", { user: req.user });
});

router.get("/stats", (req, res) => {
    res.render("dashboard/stats", { user: req.user });
});

router.get("/leaderboards", (req, res) => {
    res.render("dashboard/leaderboards", { user: req.user });
});

router.get("/moderation/:server_id", (req, res) => {

    Server.findById(req.params.server_id, (err, server) => {
        if (err) {
            res.send(err);
        }

        res.render("dashboard/moderation", { user: req.user, server: server });
    });
});

router.get("/developer", (req, res) => {
    res.render("dashboard/developer", { user: req.user });
});

router.get("/music", (req, res) => {
    res.render("dashboard/music", { user: req.user });
});

router.get("/games", (req, res) => {
    res.render("dashboard/games", { user: req.user });
});

router.get("/integrations", (req, res) => {
    res.render("dashboard/integrations", { user: req.user });
});

module.exports = router;