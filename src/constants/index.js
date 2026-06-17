export const MENU_DATA = {
  cuscuz: [
    {
      id: 'c1',
      name: 'Cuscuz Tradicional com Manteiga de Garrafa',
      price: 12.00,
      description: 'Cuscuz fofinho cozido no vapor, servido quentinho e generosamente regado com manteiga de garrafa pura.',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
      customizable: true
    },
    {
      id: 'c2',
      name: 'Cuscuz Completo Arretado',
      price: 18.00,
      description: 'Nosso clássico cuscuz recheado com queijo coalho grelhado, carne de sol desfiada acebolada e um toque de coentro.',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=400',
      customizable: true
    },
    {
      id: 'c3',
      name: 'Cuscuz do Sertão (Charque & Queijo)',
      price: 22.00,
      description: 'Cuscuz com pedaços crocantes de charque (carne seca), queijo coalho dourado na chapa e vinagrete da casa.',
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=400',
      customizable: true
    }
  ],
  pastel: [
    {
      id: 'p1',
      name: 'Pastel de Carne de Sol com Catupiry',
      price: 14.00,
      description: 'Massa super crocante e sequinha recheada com carne de sol artesanal desfiada e catupiry legítimo.',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
      customizable: false
    },
    {
      id: 'p2',
      name: 'Pastel de Queijo Coalho com Rapadura',
      price: 12.00,
      description: 'A combinação perfeita do salgado do queijo coalho derretido com o doce raspado da rapadura pura.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
      customizable: false
    },
    {
      id: 'p3',
      name: 'Pastel de Frango com Queijo de Manteiga',
      price: 14.00,
      description: 'Recheio farto de frango caipira temperado, desfiado e envolto no cremoso queijo de manteiga.',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
      customizable: false
    }
  ],
  sanduiches: [
    {
      id: 's1',
      name: 'Burguer Macaxeira',
      price: 26.00,
      description: 'Pão brioche macio, blend bovino artesanal de 150g, queijo coalho grelhado, cebola caramelizada e maionese caseira de coentro.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
      customizable: true
    },
    {
      id: 's2',
      name: 'Sertão Club (Carne de Sol na Nata)',
      price: 28.00,
      description: 'Baguete artesanal tostada na manteiga de garrafa, recheada com carne de sol desfiada salteada no creme de nata fresca, queijo derretido e rúcula.',
      image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=400',
      customizable: true
    },
    {
      id: 's3',
      name: 'X-Bode da Peste',
      price: 25.00,
      description: 'Hambúrguer artesanal temperado com ervas sertanejas, queijo de manteiga derretido, alface, tomate e nosso barbecue especial de rapadura.',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400',
      customizable: true
    }
  ],
  bebidas: [
    {
      id: 'b1',
      name: 'Cajuína São Geraldo (600ml)',
      price: 8.00,
      description: 'Refrigerante clássico de caju, patrimônio do Nordeste. Servido trincando de gelado.',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
      customizable: false
    },
    {
      id: 'b2',
      name: 'Guaraná Jesus (Lata)',
      price: 8.00,
      description: 'O refrigerante cor-de-rosa mais amado do Brasil, com seu toque inconfundível de cravo e canela.',
      image: 'https://images.unsplash.com/photo-1527960656306-ff37c641293a?auto=format&fit=crop&q=80&w=400',
      customizable: false
    },
    {
      id: 'b3',
      name: 'Suco de Graviola Natural',
      price: 9.00,
      description: 'Suco natural feito com a polpa da graviola fresca, batido na hora com água ou leite.',
      image: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=400',
      customizable: false
    }
  ]
};

export const AVAILABLE_TOPPINGS = [
  { name: 'Manteiga de Garrafa Extra', price: 0.00 },
  { name: 'Queijo Coalho Grelhado', price: 3.50 },
  { name: 'Carne de Sol Desfiada', price: 5.00 },
  { name: 'Charque Crocante', price: 5.00 },
  { name: 'Ovo Gema Mole', price: 2.50 },
  { name: 'Coentro Fresquinho', price: 0.00 },
  { name: 'Vinagrete do Sertão', price: 0.00 },
  { name: 'Maionese de Coentro', price: 0.00 }
];

export const FRANCHISES = [
  {
    city: 'Recife - PE',
    address: 'Av. Boa Viagem, 1950 - Loja A - Boa Viagem',
    hours: '11:00 às 23:00 todos os dias',
    phone: '(81) 3465-9876',
    mapUrl: 'Recife, PE'
  },
  {
    city: 'Fortaleza - CE',
    address: 'Av. Beira Mar, 2800 - Meireles',
    hours: '11:30 às 23:30 todos os dias',
    phone: '(85) 3242-7654',
    mapUrl: 'Fortaleza, CE'
  },
  {
    city: 'João Pessoa - PB',
    address: 'Av. Cabo Branco, 1420 - Cabo Branco',
    hours: '11:00 às 22:30 todos os dias',
    phone: '(83) 3247-4532',
    mapUrl: 'Joao Pessoa, PB'
  },
  {
    city: 'Salvador - BA',
    address: 'Av. Oceânica, 450 - Barra',
    hours: '12:00 às 00:00 todos os dias',
    phone: '(71) 3264-8899',
    mapUrl: 'Salvador, BA'
  }
];
