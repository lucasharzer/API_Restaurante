const express = require("express");

const authMiddleware = require("../middlewares/auth");

const cadastro_funcionarios = require("../controllers/funcionarios/cadastro");
const login_funcionarios = require("../controllers/funcionarios/login");
const esquecer_senha_funcionarios = require("../controllers/funcionarios/esquecer_senha");

const cadastro_cliente = require("../controllers/clientes/cadastro");
const login_cliente = require("../controllers/clientes/login");
const esquecer_senha_clientes = require("../controllers/clientes/esquecer_senha");

const itens_cardapio = require("../controllers/cardapio/todos_itens");
const item_cardapio = require("../controllers/cardapio/detalhar_item");
const itens_disponiveis = require("../controllers/cardapio/somente_disponiveis");

const mostrar_planos = require("../controllers/planos/mostrar_planos");
const mostrar_plano = require("../controllers/planos/mostrar_plano");

const confirmacao_funcionarios = require("../controllers/funcionarios/confirmacao");
const trocar_senha_funcionarios = require("../controllers/funcionarios/trocar_senha");
const perfil_funcionarios = require("../controllers/funcionarios/perfil/perfil");
const idade_funcionarios = require("../controllers/funcionarios/perfil/alterar_idade");
const nome_funcionarios = require("../controllers/funcionarios/perfil/alterar_nome");
const senha_funcionarios = require("../controllers/funcionarios/perfil/alterar_senha");
const criar_prato = require("../controllers/funcionarios/pratos/criar_prato");
const alterar_prato = require("../controllers/funcionarios/pratos/alterar_prato");
const remover_prato = require("../controllers/funcionarios/pratos/deletar_prato");

const confirmacao_clientes = require("../controllers/clientes/confirmacao");
const trocar_senha_clientes = require("../controllers/clientes/trocar_senha");
const mostrar_meu_plano = require("../controllers/clientes/plano/mostrar_plano");
const alterar_plano = require("../controllers/clientes/plano/alterar_plano");
const perfil = require("../controllers/clientes/perfil/perfil");
const alterar_idade = require("../controllers/clientes/perfil/alterar_idade");
const alterar_nome = require("../controllers/clientes/perfil/alterar_nome");
const alterar_senha = require("../controllers/clientes/perfil/alterar_senha");

const criar_pedido = require("../controllers/pedidos/criar_pedido");
const entregar_pedido = require("../controllers/pedidos/entregar_pedido");
const cancelar_pedido = require("../controllers/pedidos/cancelar_pedido");
const listar_pedidos = require("../controllers/pedidos/listar_pedidos");
const listar_pedido = require("../controllers/pedidos/listar_pedido");
const pedidos_entregues = require("../controllers/pedidos/pedidos_entregues");
const pedidos_nao_entregues = require("../controllers/pedidos/pedidos_nao_entregues");


// Rotas
const router = express.Router();

// - Funcionários
router.post("/funcionarios/cadastro", cadastro_funcionarios.cadastro_funcionarios);

router.post("/funcionarios/login", login_funcionarios.login_funcionarios);

router.post("/funcionarios/esquecer_senha", esquecer_senha_funcionarios.esquecer_senha_funcionarios);

// - Clientes
router.post("/clientes/cadastro", cadastro_cliente.cadastro_clientes);

router.post("/clientes/login", login_cliente.login_clientes);

router.post("/clientes/esquecer_senha", esquecer_senha_clientes.esquecer_senha_clientes);

// - Cardápio
router.get("/cardapio/itens/disponiveis", itens_disponiveis.itens_disponiveis_cardapio);

router.get("/cardapio/itens/:cod", item_cardapio.item_cardapio);

router.get("/cardapio/itens", itens_cardapio.itens_cardapio);

// - Planos
router.get("/planos", mostrar_planos.mostrar_planos);

router.get("/planos/:cod", mostrar_plano.mostrar_plano);

// - Funcionários Auth
router.use(authMiddleware);
router.post("/funcionarios/confirmacao", confirmacao_funcionarios.confirmacao_funcionarios);

router.use(authMiddleware);
router.post("/funcionarios/trocar_senha", trocar_senha_funcionarios.trocar_senha_funcionarios);

router.use(authMiddleware);
router.get("/funcionarios/perfil", perfil_funcionarios.perfil_funcionarios);

router.use(authMiddleware);
router.put("/funcionarios/alterar/idade", idade_funcionarios.alterar_idade_funcionarios);

router.use(authMiddleware);
router.put("/funcionarios/alterar/nome", nome_funcionarios.alterar_nome_funcionarios);

router.use(authMiddleware);
router.put("/funcionarios/alterar/senha", senha_funcionarios.alterar_senha_funcionarios);

router.use(authMiddleware);
router.post("/funcionarios/pratos/criar", criar_prato.criar_prato);

router.use(authMiddleware);
router.put("/funcionarios/pratos/alterar", alterar_prato.alterar_prato);

router.use(authMiddleware);
router.delete("/funcionarios/pratos/remover", remover_prato.remover_prato);

// - Clientes Auth
router.use(authMiddleware);
router.post("/clientes/confirmacao", confirmacao_clientes.confirmacao_clientes);

router.use(authMiddleware);
router.put("/clientes/trocar_senha", trocar_senha_clientes.trocar_senha_clientes);

router.use(authMiddleware);
router.get("/clientes/plano/mostrar", mostrar_meu_plano.mostrar_plano);

router.use(authMiddleware);
router.put("/clientes/plano/alterar", alterar_plano.alterar_plano);

router.use(authMiddleware);
router.get("/clientes/perfil", perfil.perfil_clientes);

router.use(authMiddleware);
router.put("/clientes/alterar/idade", alterar_idade.alterar_idade_clientes);

router.use(authMiddleware);
router.put("/clientes/alterar/nome", alterar_nome.alterar_nome_clientes);

router.use(authMiddleware);
router.put("/clientes/alterar/senha", alterar_senha.alterar_senha_clientes);

// Pedidos Auth
router.use(authMiddleware);
router.post("/pedidos/criar", criar_pedido.criar_pedido);

router.use(authMiddleware);
router.put("/pedidos/entregar", entregar_pedido.entregar_pedido);

router.use(authMiddleware);
router.delete("/pedidos/cancelar", cancelar_pedido.cancelar_pedido);

router.use(authMiddleware);
router.get("/pedidos", listar_pedidos.listar_pedidos);

router.use(authMiddleware);
router.get("/pedidos/entregues", pedidos_entregues.listar_pedidos_entregues);

router.use(authMiddleware);
router.get("/pedidos/nao_entregues", pedidos_nao_entregues.listar_pedidos_n_entregues);

router.use(authMiddleware);
router.get("/pedidos/:cod", listar_pedido.listar_pedido);


module.exports = router;