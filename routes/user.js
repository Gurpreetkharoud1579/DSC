const express = require('express');

module.exports.user = (req, res) => {
    return res.send("<h1>Welcome to users </h1>");
}