const express = require('express');

module.exports.home = (req, res) => {
    return res.send('<h1>Home for Daily Sharing and Connect </h1>');
}