const uuid = require('uuid')
const {
  omitTime,
} = require('db/queries/helper')
const {
  generics,
} = require('db/queries')

describe('generics (crud)', () => {
  const crud = generics('muscles')
  test('can create and destroy', async () => {
    expect.assertions(0)
    const id = uuid.v4()
    await crud.create({ id, })
    await crud.remove({ id, })
  })
  test('can update', async () => {
    expect.assertions(2)
    const id = uuid.v4()
    const description = `ethical McSweeney's meh single-origin coffee Tumblr post-ironic disrupt Etsy iPhone trust fund Thundercats sriracha church-key skateboard bitters cray PBR cliche roof party leggings fingerstache letterpress biodiesel occupy plaid normcore mumblecore cred blog Marfa Tonx seitan VHS tofu Pitchfork wolf cardigan tousled tote bag Wes Anderson DIY Blue Bottle pop-up cornhole lomo ennui bespoke stumptown whatever kitsch vegan pug actually 8-bit YOLO High Life Portland Shoreditch small batch meggings American Apparel Vice Intelligentsia viral bicycle rights forage scenester dreamcatcher quinoa direct trade before they sold out Neutra four loko Echo Park chia Helvetica 3 wolf moon crucifix yr semiotics tattooed mustache gentrify Odd Future you probably haven't heard of them fixie Banksy Cosby sweater messenger bag swag sustainable kogi heirloom PBR&B chillwave slow-carb chambray Carles distillery gastropub irony squid flannel twee Godard mlkshk try-hard kale chips wayfarers typewriter flexitarian Pinterest umami banh mi hoodie Williamsburg craft beer retro pour-over fashion axe drinking vinegar raw denim sartorial banjo gluten-free aesthetic Brooklyn lo-fi hella pickled asymmetrical photo booth synth locavore brunch readymade butcher authentic Bushwick next level Truffaut food truck fanny pack artisan pork belly literally Austin salvia narwhal fap selvage deep v master cleanse Kickstarter ugh selfies keytar farm-to-table mixtape polaroid street art hashtag organic art party jean shorts beard put a bird on it keffiyeh 90's Schlitz freegan +1 paleo shabby chic XOXO vinyl`
    const created = await crud.create({ id, })
    const updated = await crud.update({ id, }, { description, })
      .then((muscles) => muscles[0])
    expect(created.description).toBe('')
    expect(updated.description).toBe(description)
  })
  test('can read', async () => {
    expect.assertions(1)
    const id = uuid.v4()
    const created = await crud.create({ id, })
    const read = await crud.read({ id, })
      .then((muscles) => muscles[0])
    expect(created).toEqual(read)
  })

  describe('count', () => {
    test('can count the number of muscles', async () => {
      expect.assertions(2)
      const id1 = uuid.v4()
      const id2 = uuid.v4()
      const name = uuid.v4()
      await crud.create({ name, id: id1, })
      await crud.create({ name, id: id2, })
      const count = await crud.count({ name, })
      await crud.remove({ name, })
      expect(count).toBe('2')
      expect(await crud.count({ name, })).toBe('0')
    })
    test('querying for all can get you more than you bargain for', async () => {
      expect.assertions(1)
      const id = uuid.v4()
      await crud.create({ id, })
      const count = await crud.count()
      await crud.remove({ id, })
      expect(+count).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOne', () => {
    test('gets only one element', async () => {
      expect.assertions(2)
      const name = 'known name'
      const user1 = await crud.create({ id: uuid.v4(), name, })
      const user2 = await crud.create({ id: uuid.v4(), name, })
      const count = await crud.count({ name, })
      const found = await crud.findOne({ name, })
      await crud.remove({ name, })
      expect(count).toBe('2')
      expect(user1).toEqual(found)
    })
  })
})
