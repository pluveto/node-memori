import Axios from 'axios'
import qs from 'querystring'
var baseUrl = 'http://bupt.pluvet.com:1323'
var urls = {
    collections: baseUrl + '/collections',
    cards: baseUrl + '/cards',
    displacements: baseUrl + '/displacements',
    conjugation: baseUrl + '/conjugate/fr',
    status: baseUrl + '/status',
    alive: baseUrl + '/alive',
    etymology: baseUrl + "/etymology/en",
    dict: baseUrl + "/dict"
}
export default {
    clockInImageUrl: urls.status + "/clock_in/image",
    getEtymology(word, then) {
        Axios.get(urls.etymology + "/" + word).then((res) => {
            console.log(res)
            then(res.data)
        })
    },
    randomlyActivate(collectionId, then) {
        Axios.get(urls.collections + "/" + collectionId + "/random_activate?count=10").then(
            (res) => then(res.data)
        )
    },
    getFrenchConjungation(verb, then) {
        Axios.get(urls.conjugation + "/" + verb).then(function (response) {
            then(response.data)
            console.log(response.data)
        })
    },
    getCollections: function (then) {
        Axios.get(urls.collections).then(function (response) {
            then(response.data)
        })
    },
    getCollection: function (id, then) {
        Axios.get(urls.collections + "/" + id).then(function (response) {
            then(response.data)
        })
    },
    addCollection: function (name, then) {
        var bodyFormData = new FormData()
        bodyFormData.set('name', name)
        Axios.post(urls.collections, bodyFormData).then(then())
    },
    removeCollection: function (id) {
        Axios.delete(urls.collections + "/" + id).then(function () { })
    },
    addCard(collectionId, card, then) {
        var bodyFormData = new FormData()
        bodyFormData.set("collection_id", collectionId)
        bodyFormData.set("pos", card.pos)
        bodyFormData.set("spell", card.spell)
        bodyFormData.set("translation", card.translation)
        bodyFormData.set("addition", card.addition)
        Axios.post(urls.cards, bodyFormData).then((res) => then(res.data))
    },
    getCards(collectionId, page, pageSize, then) {
        var requestBody = {
            collection_id: collectionId,
            page: page,
            pagesize: pageSize
        }
        Axios.get(urls.cards + '?' + qs.stringify(requestBody))
            .then((res) => then(res.data))
    },
    getCardsByActivation(collectionId, page, pageSize, is_activated, then) {
        var requestBody = {
            collection_id: collectionId,
            page: page,
            pagesize: pageSize,
            is_activated: is_activated,
        }
        Axios.get(urls.cards + '?' + qs.stringify(requestBody))
            .then((res) => then(res.data))
    },
    setCardActivation(cardId, is_activated, then) {
        var bodyFormData = new FormData()
        bodyFormData.set("is_activated", is_activated)
        Axios.put(urls.cards + '/' + cardId + '/activate', bodyFormData).then(() => {
            if (typeof then === "function") {
                then()
            }
        })
    },
    getCard(id, then) {
        Axios.get(urls.cards + '/' + id)
            .then((res) => then(res.data))
    },
    removeCard(id) {
        var url = urls.cards + "/" + id
        Axios.delete(url).then(function () { })
        console.log("删除卡片: " + url)
    },
    updateCard(card, then) {
        var bodyFormData = new FormData()
        bodyFormData.set("collection_id", card.collection_id)
        bodyFormData.set("pos", card.pos)
        bodyFormData.set("spell", card.spell)
        bodyFormData.set("translation", card.translation)
        bodyFormData.set("addition", card.addition)
        Axios.put(urls.cards + "/" + card.id, bodyFormData).then((data) => then(data))
    },
    syncCard(card, then) {
        var bodyFormData = new FormData()
        bodyFormData.set("mastery", card.mastery)
        bodyFormData.set("active_at", Math.ceil(+ new Date() / 1000))
        bodyFormData.set("addition", card.addition)
        Axios.put(urls.cards + "/" + card.id + "/sync", bodyFormData).then(() => then())
    },
    addDisplacements(collectionId, displacement, then) {
        console.log("addDisplacements", displacement.displacements)

        var first = displacement.displacements[0];
        var bodyFormData = new FormData()
        bodyFormData.set("collection_id", collectionId)
        bodyFormData.set("hint", displacement.hint)
        bodyFormData.set("translation", displacement.translation)

        bodyFormData.set("pos", first.pos)
        bodyFormData.set("aux", first.aux)
        bodyFormData.set("answer", first.answer)
        bodyFormData.set("addition", first.addition)
        console.log("准备post")
        then()
        Axios.post(urls.displacements, bodyFormData).then(
            (response) => {
                console.log(response)
                for (var i = 1; i < displacement.displacements.length; i++) {
                    var current = displacement.displacements[i]
                    var bodyFormData = new FormData()
                    bodyFormData.set("collection_id", collectionId)
                    bodyFormData.set("hint_id", response.data.hint_id)
                    bodyFormData.set("pos", current.pos)
                    bodyFormData.set("aux", current.aux)
                    bodyFormData.set("answer", current.answer)
                    bodyFormData.set("addition", current.addition)
                    Axios.post(urls.displacements, bodyFormData).then(
                        () => console.log("Displacement: " + current.answer + "added")
                    )
                }

            }
        )
    },
    getDisplacements(relId, then) {
        Axios.get(urls.displacements + '/' + relId)
            .then((res) => then(res.data))
    },
    updateDisplacements(relId, displacementNested, then) {
        var bodyFormData = new FormData()
        bodyFormData.set("hint", displacementNested.hint)
        bodyFormData.set("translation", displacementNested.translation)
        Axios.put(urls.displacements + '/' + relId, bodyFormData)

        for (var i = 0; i < displacementNested.displacements.length; i++) {
            var currentItem = displacementNested.displacements[i]

            var bodyFormData = new FormData()
            bodyFormData.set("pos", currentItem.pos)
            bodyFormData.set("aux", currentItem.aux)
            bodyFormData.set("answer", currentItem.answer)
            bodyFormData.set("addition", currentItem.addition)

            if (currentItem.id != undefined) {
                //UpdateDisplacementItem
                Axios.put(urls.displacements + '/item/' + currentItem.id, bodyFormData)
                continue;
            }
            //AddDisplacementItem
            bodyFormData.set("collection_id", displacementNested.collection_id)
            bodyFormData.set("hint_id", displacementNested.id)
            Axios.post(urls.displacements, bodyFormData).then(
                () => console.log("Displacement: " + currentItem.answer + " added")
            )
        }

        then()


    },
    removeDisplacementItem(id, then) {
        Axios.delete(urls.displacements + '/item/' + id)
    },
    removeDisplacementRel(hintId, then) {
        Axios.delete(urls.displacements + '/' + hintId)
    },
    getDisplacementRels(collectionId, page, pageSize, then) {
        var requestBody = {
            collection_id: collectionId,
            page: page,
            pagesize: pageSize
        }
        Axios.get(urls.displacements + '?' + qs.stringify(requestBody))
            .then((res) => then(res.data))
    },
    getCardsToLearn(collectionId, count, then) {
        var requestBody = {
            collection_id: collectionId,
            count: count
        }
        Axios.get(urls.collections + "/" + collectionId + "/learn?" + qs.stringify(requestBody))
            .then((res) => then(res.data))
    }
    , getStatusToday(then) {
        Axios.get(urls.status + "/today").then((res) => {
            then(res.data)
            console.log("status ", res.data)
        })
    }
    , heartBeat(collection_id, card_id) {
        var bodyFormData = new FormData()
        bodyFormData.set("collection_id", collection_id)
        bodyFormData.set("card_id", card_id)
        bodyFormData.set("time_increase", 5)
        Axios.post(urls.alive, bodyFormData).then((res) =>
            console.log(res))
    },
    clockIn(then) {
        Axios.get(urls.status + "/clock_in").then(() => {
            then()
        })
    },
    queryWord(spell, lang, then) {
        if (lang == "fr")
            Axios.get(urls.dict + "/" + lang + "/" + encodeURI(spell.toLowerCase())).then((res) => {
                const regex = /([\wé].)+/gm;
                let m;
                let pos = ''; 
                while ((m = regex.exec(res.data[0].label)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    // The result can be accessed through the `m`-variable.
                    pos += m[0] + " / "
                }
                pos = pos.substr(0, pos.length - 3)

                then({
                    pos: pos,
                    translation: res.data[0].label.replace(regex, '_'),
                    spell: res.data[0].value
                })
            })
    }

}
