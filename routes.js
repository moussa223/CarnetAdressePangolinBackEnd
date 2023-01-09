const express = require('express');
const router = express.Router();
const Pangolin = require('./model');
const bcrypt = require('bcrypt');
const passport = require('passport')
const jwt = require('jsonwebtoken')


// recupérer la liste des pangolins de la base de données
router.get('/pangolin', function(req, res) {
    Pangolin.find({}, function(err, pangolin) {
        if (err) {
            res.send(err);
        }
        res.json(pangolin);
    });
});
// Ajouter de nouveaux documents à la collection
router.post('/AddPangolin', function(req, res) {
    // Générez un salt à l'aide de bcrypt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.send(err);
        }

        // Utilisez le salt pour hasher le mot de passe
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
                return res.send(err);
            }

            // Remplacez le mot de passe non-hashé par le mot de passe hashé
            req.body.password = hash;

            // Enregistrez le pangolin dans la base de données
            Pangolin.create(req.body, (err, pangolin) => {
                if (err) {
                    res.send(err);
                } else {
                    let payload = {subject: pangolin._id}
                    let token = jwt.sign(payload,'CleSecrete')
                    console.log(req.body);
                    res.status(200).send({token}) // on envoie le token à la place des details du pangolin
                    //res.json(pangolin);// on envoie le contenu du pangolin enregistré ou inscrit
                }
            });
        });
    });
});
// Mettre à jour un pangolin
router.put('/pangolin/:id', function(req, res) {
    Pangolin.findById(req.params.id, function(err, pangolin) {
        if (err) {
            res.send(err);
        }
        pangolin.name = req.body.name;
        pangolin.role = req.body.role;
        pangolin.ami = req.body.ami;
        pangolin.login = req.body.login;
        pangolin.password = req.body.password;
        pangolin.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Pangolin mis à jour !' });
        });
    });
});
// Supprimé un pangolin
router.delete('/pangolin/:id', function(req, res) {
    Pangolin.remove({ _id: req.params.id }, function(err, pangolin) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Pangolin supprimé !' });
    });
});


// système de connexion pour vérifier si le pangolin existe et si le mot de passe correspond
// on compare les mots de passe avec la fonction Bcrypt
router.post('/login',(req,res,next) =>{
    Pangolin.findOne({ login: req.body.login }, function(err, pangolin) {
        if (err) {
            return res.send(err);
        }
        if (!pangolin) {
            return res.status(401).send('login ou mot de pase inccorect');
        }
        // Le pangolin existe, comparez les mots de passe
        bcrypt.compare(req.body.password,pangolin.password, function(err, isMatch) {
            if (err) {
                return res.send(err);
            }
            if (!isMatch) {
                console.log('Mot de passe incorrect');
                return res.status(401).send('login ou mot de pase inccorect');
            }
            else {

                // Les mots de passe sont corrects, connectez l'utilisateur
                console.log('Authentification réussie');
                let payload = {subject: pangolin._id}
                let token = jwt.sign(payload,'CleSecrete')
                res.status(200).send({token})// on envoie le token de connexion
                //return res.status(200).send(pangolin);//on envoie le contenu du pangolin qui s'est connecté

            }

        });
    });
})
module.exports = router;