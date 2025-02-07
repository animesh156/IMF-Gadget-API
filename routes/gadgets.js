const express = require('express')
const router = express.Router()
const prisma = require('../prismaClient')

const randomCodenames = ["The Nightingale", "The Kraken", "Ghost Hand"];

// GET  route for all gadgets
router.get('/', async (req,res) => {
    try {
        const gadgets = await prisma.gadget.findMany()
        res.json(
            gadgets.map((gadget) => (
                {
                    ...gadget,
                    missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
                }
            ))
        )
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})


// POSt new gadget
router.post('/', async (req,res) => {
    try {
        const codename = randomCodenames[Math.floor(Math.random() * randomCodenames.length)]
        const newGadget = await prisma.gadget.create({
            data: {name: codename, status: "Available"},
        })

        res.json(newGadget)
    } catch (error) {
        res.status(500).json({error: "Failed to create gadget"})
    }
})


// PUT  updted gadget
router.put(':/id', async (req,res) => {
    try {
        const {status} = req.body;
        const updatedGadget = await prisma.gadget.update({
            where: {id: req.params.id},
            data: {status}
        })

        res.json(updatedGadget)
    } catch (error) {
        res.status(400).json({error: "Failed to update gadget"})
    }
})

// DELETE route
router.delete(':/id', async (req,res) => {
    try {
        const updatedGadget = await prisma.gadget.update({
            where: {id: req.params.id},
            data: {staus: "Decommissioned", decommissionedAt: new Date()}
        })

        res.json({msg: "Gadget decommissioned", gadget: updatedGadget})
    } catch (error) {
        res.status(400).json({error: "Failed to decommission gadget"})
    }
})


// Self_Destruct Sequence

router.post(':/id/self-destruct', async (req,res) => {
    try {
        const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();

        await prisma.gadget.update({
          where: { id: req.params.id },
          data: { status: "Destroyed" },
        });
    
        res.json({ message: "Self-destruct sequence activated!", confirmationCode });
    } catch (error) {
        res.status(400).json({ error: "Failed to self-destruct" });
    }
})


module.exports = router