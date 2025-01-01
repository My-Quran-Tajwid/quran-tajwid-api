const express = require('express');
const HafsWord = require('../models/HafsWord');

const router = express.Router();

// Caching Middleware
const cacheMiddleware = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800'); // Cache for 1 day, allow revalidation for 7 days
    next();
};

// Find by Surah and group by Ayat
router.get('/:surahNumber', cacheMiddleware, async (req, res) => {
    try {
        const surahNumber = parseInt(req.params.surahNumber, 10);

        // Fetch and sort data
        const words = await HafsWord.findAll({
            where: { Sura: surahNumber },
            order: [['Verse', 'ASC'], ['WordNum', 'ASC']],
            attributes: ['Sura', 'Verse', 'PageNo', 'FontCode', 'FontName'],
        });

        // Group words by Ayat
        const groupedData = words.reduce((acc, word) => {
            const ayatNumber = word.Verse;

            // Check if the ayat already exists in the accumulator
            let ayatGroup = acc.find(group => group.ayat === ayatNumber);

            if (!ayatGroup) {
                // If the ayat does not exist, create a new group
                ayatGroup = {
                    surah: word.Sura,
                    ayat: word.Verse,
                    page: word.PageNo,
                    words: [],
                };
                acc.push(ayatGroup);
            }

            // Add the word to the group's words array
            ayatGroup.words.push({
                fontCode: word.FontCode,
                fontFamily: word.FontName,
            });

            return acc;
        }, []);

        // Sort words in each ayat group to ensure QCF4_QBSML takes precedence
        // QCF4_QBSML usually is the surah title
        groupedData.forEach(ayatGroup => {
            ayatGroup.words.sort((a, b) => {
                if (a.fontFamily === 'QCF4_QBSML' && b.fontFamily !== 'QCF4_QBSML') {
                    return -1;
                }
                if (a.fontFamily !== 'QCF4_QBSML' && b.fontFamily === 'QCF4_QBSML') {
                    return 1;
                }
                return 0; // Maintain original order if both are equal
            });
        });

        res.status(200).json(groupedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Find by Page and group by Ayat with QCF4_QBSML precedence
router.get('/byPage/:pageNumber', cacheMiddleware, async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber, 10);

        const words = await HafsWord.findAll({
            where: { PageNo: pageNumber },
            order: [['Sura', 'ASC'], ['Verse', 'ASC'], ['WordNum', 'ASC']],
            attributes: ['Sura', 'Verse', 'PageNo', 'FontCode', 'FontName'],
        });

        const groupedData = words.reduce((acc, word) => {
            const ayatNumber = word.Verse;

            // Find or create the ayat group
            let ayatGroup = acc.find(group => group.surah === word.Sura && group.ayat === ayatNumber);

            if (!ayatGroup) {
                ayatGroup = {
                    surah: word.Sura,
                    ayat: word.Verse,
                    page: word.PageNo,
                    words: [],
                };
                acc.push(ayatGroup);
            }

            // Add word details to the words array
            ayatGroup.words.push({
                fontCode: word.FontCode,
                fontFamily: word.FontName,
            });

            return acc;
        }, []);

        // Sort words in each ayat group to ensure QCF4_QBSML takes precedence
        // QCF4_QBSML usually is the surah title
        groupedData.forEach(ayatGroup => {
            ayatGroup.words.sort((a, b) => {
                if (a.fontFamily === 'QCF4_QBSML' && b.fontFamily !== 'QCF4_QBSML') {
                    return -1;
                }
                if (a.fontFamily !== 'QCF4_QBSML' && b.fontFamily === 'QCF4_QBSML') {
                    return 1;
                }
                return 0; // Maintain original order if both are equal
            });
        });

        res.status(200).json(groupedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
