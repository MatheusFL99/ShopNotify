const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const User = require('../models/user')
const Address = require('../models/address')

module.exports = class addressController {
  ////////// CRIAR NOVO ENDEREÇO //////////
  static async createAddress(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const { name, streetaddress, complement, city, state, zipcode, country } =
      req.body

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!streetaddress) {
      res.status(422).json({ message: 'Endereço é obrigatório!' })
      return
    }
    if (!city) {
      res.status(422).json({ message: 'Cidade é obrigatória!' })
      return
    }
    if (!state) {
      res.status(422).json({ message: 'Estado é obrigatório!' })
      return
    }
    if (!zipcode) {
      res.status(422).json({ message: 'CEP é obrigatório!' })
      return
    }
    if (!country) {
      res.status(422).json({ message: 'País é obrigatório!' })
      return
    }

    // salvar endereço no banco de dados
    const address = new Address({
      name,
      streetaddress,
      complement,
      city,
      state,
      zipcode,
      country,
      user: {
        _id: user.id,
        name: user.name
      }
    })

    try {
      const newAddress = await address.save()
      res.status(200).json(newAddress)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ///////// REMOVER ENDEREÇO //////////
  static async removeAddress(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const addressId = req.params.id

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!addressId) {
      res.status(422).json({ message: 'Endereço é obrigatório!' })
      return
    }

    // remover endereço do banco de dados
    try {
      const addressRemoved = await Address.findByIdAndRemove(addressId)
      res.status(200).json(addressRemoved)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ////////// EDITAR ENDEREÇO //////////
  static async editAddress(req, res) {
    const addressId = req.params.id
    const { streetadress, complement, city, state, zipcode, country } = req.body

    // validações
    if (!streetadress) {
      res.status(422).json({ message: 'Endereço é obrigatório!' })
      return
    }
    if (!city) {
      res.status(422).json({ message: 'Cidade é obrigatória!' })
      return
    }
    if (!state) {
      res.status(422).json({ message: 'Estado é obrigatório!' })
      return
    }
    if (!zipcode) {
      res.status(422).json({ message: 'CEP é obrigatório!' })
      return
    }
    if (!country) {
      res.status(422).json({ message: 'País é obrigatório!' })
      return
    }

    try {
      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        {
          streetadress,
          complement,
          city,
          state,
          zipcode,
          country
        },
        { new: true }
      )
      res.status(200).json(updatedAddress)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ////////// LISTAR ENDEREÇOS DO USUÁRIO //////////
  static async getUserAddresses(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    try {
      const userAddresses = await Address.find({ user: user.id })
      res.status(200).json(userAddresses)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ////////// LISTAR ENDEREÇO POR ID //////////
  static async getAddressById(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const addressId = req.params.id

    try {
      const address = await Address.findById(addressId)
      if (user.id == address.user._id) {
        res.status(200).json(address)
      }
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
