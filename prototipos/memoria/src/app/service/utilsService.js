(function () {

    'use strict';


    angular.module('memoria')

        .factory('UtilsService', UtilsService);

    /** @ngInject */
    function UtilsService() {


      var processoPMBOK = [
        { "nome":"INICIAÇÃO", "tipo":1 ,
          list:[{"nome":"Desenvolver o termo de abertura do projeto", "tipo":1},
                {"nome":"Identificar as partes interessadas", "tipo":1}]
        },
        { "nome":"PLANEJAMENTO", "tipo":2 ,
          list:[{"nome":"Desenvolver o plano de gerenciamento do projeto", "tipo":2},
                {"nome":"Coletar os requisitos", "tipo":2},
                {"nome":"Definir as atividades", "tipo":2},
                {"nome":"Criar a Estrutura Analítica do Projeto (EAP)", "tipo":2},
                {"nome":"Planejar o gerenciamento do cronograma", "tipo":2},
                {"nome":"Definir o escopo", "tipo":2}
              ]
        },
        { "nome":"CONTROLE E MONITORAMENTO", "tipo":3 ,
          list:[
            {"nome":"Monitorar e Controlar o Trabalho do Projeto", "tipo":3},
            {"nome":"Realizar o Controle Integrado de Mudanças", "tipo":3},
            {"nome":"Validar o Escopo", "tipo":3},
            {"nome":"Controlar o Escopo", "tipo":3},
            {"nome":"Controlar o Cronograma", "tipo":3},
            {"nome":"Controlar os Custos", "tipo":3},
            {"nome":"Controlar a Qualidade", "tipo":3},
            {"nome":"Controlar as Comunicações", "tipo":3},
            {"nome":"Monitorar e Controlar os Riscos", "tipo":3},
            {"nome":"Administrar as Aquisições", "tipo":3},
            {"nome":"Controlar o Engajamento das Partes Interessadas", "tipo":3}
          ]
        },
        { "nome":"EXECUÇÃO", "tipo":4 ,
          list:[
            {"nome":"Orientar e Gerenciar o Trabalho do Projeto", "tipo":4},
            {"nome":"Realizar a Garantia da Qualidade", "tipo":4},
            {"nome":"Mobilizar a Equipe do Projeto", "tipo":4},
            {"nome":"Desenvolver a Equipe do Projeto", "tipo":4},
            {"nome":"Gerenciar a Equipe do Projeto", "tipo":4},
            {"nome":"Gerenciar as Comunicações", "tipo":4},
            {"nome":"Conduzir as aquisições", "tipo":4},
            {"nome":"Gerenciar o Engajamento das Partes Interessadas", "tipo":4}
          ]
        },
        { "nome":"ENCERRAMENTO", "tipo":5 ,
          list:[
            {"nome":"Encerrar o Projeto ou Fase", "tipo":5},
            {"nome":"Encerrar as Aquisições", "tipo":5}
          ]
        }
          ];

      var processoITILV3 = [
       { "nome":"ESTRATÉGIA DE SERVIÇO", "tipo":1 ,
         list:[{"nome":"Gerenciamento estratégico para serviços de TI", "tipo":1},
              {"nome":"Gerenciamento de portfólio de serviço", "tipo":1},
              {"nome":"Gerenciamento financeiro", "tipo":1},
              {"nome":"Gerenciamento de demanda", "tipo":1},
              {"nome":"Gerenciamento de relacionamento de negócio", "tipo":1}
            ]
       },
       { "nome":"DESENHO DE SERVICO", "tipo":2 ,
         list:[{"nome":"Coordenação do desenho", "tipo":2},
                {"nome":"Gerenciamento do catálogo de serviço", "tipo":2},
                {"nome":"Gerenciamento de nível de serviço", "tipo":2},
                {"nome":"Gerenciamento de disponibilidade", "tipo":2},
                {"nome":"Gerenciamento de capacidade", "tipo":2},
                {"nome":"Gerenciamento de continuidade do serviço", "tipo":2},
                {"nome":"Gerenciamento de segurança da informação", "tipo":2},
                {"nome":"Gerenciamento do fornecedor", "tipo":2}
             ]
       },
       { "nome":"TRANSIÇÃO", "tipo":3 ,
         list:[
           {"nome":"Planejamento e suporte da transição", "tipo":3},
           {"nome":"Gerenciamento da mudança", "tipo":3},
           {"nome":"Gerenciamento de configuração e de ativo de serviço", "tipo":3},
           {"nome":"Gerenciamento de liberação e implantação", "tipo":3},
           {"nome":"Validação e teste de serviço", "tipo":3},
           {"nome":"Avaliação de mudança", "tipo":3},
           {"nome":"Gerenciamento de conhecimento", "tipo":3}
         ]
       },
       { "nome":"OPERAÇÃO", "tipo":4 ,
         list:[
           {"nome":"Gerenciamento de evento", "tipo":4},
           {"nome":"Gerenciamento de incidente", "tipo":4},
           {"nome":"Atendimento da requisção do serviço", "tipo":4},
           {"nome":"Gerenciamento de problema", "tipo":4},
           {"nome":"Gerenciamento de acesso", "tipo":4},
           {"nome":"FUNCAO Central de Serviço", "tipo":4},
           {"nome":"FUNCAO Gerenciamento Técnico", "tipo":4},
           {"nome":"FUNCAO Gerenciamento de operações de TI", "tipo":4},
           {"nome":"FUNCAO Gerenciamento de aplicativo", "tipo":4}
         ]
       },
       { "nome":"MELHORIA CONTINUADA", "tipo":5 ,
         list:[
           {"nome":"Melhoria de Sete Passos", "tipo":5 }
         ]
       }
          ];

      var processoMPSBR = [
      { "nome":"Parcialmente Gerenciado - G", "tipo":"G" ,
        list:[
             {"nome":"Gerência de Requisitos", "tipo":"G"},
             {"nome":"Gerência do Projeto", "tipo":"G"}
           ]
      },
      { "nome":"Gerenciado - F", "tipo":"F" ,
        list:[{"nome":"Medição", "tipo":"F"},
               {"nome":"Gerência de Configuração", "tipo":"F"},
               {"nome":"Aquisição", "tipo":"F"},
               {"nome":"Garantia da Qualidade", "tipo":"F"},
               {"nome":"Gerência de Portifólio de Projetos - GPP", "tipo":"F"}
            ]
      },
      { "nome":"Parcialmente Definido - E", "tipo":3 ,
        list:[
          {"nome":"Gerência de Projetos - (Evolução)", "tipo":3},
          {"nome":"Definição do Processo Organizacional", "tipo":3},
          {"nome":"Avaliação e Melhoria do Processo Organizacional", "tipo":3},
          {"nome":"Gerência de Reutilização - GRU", "tipo":3},
          {"nome":"Gerência de Recursos Humanos", "tipo":3}
        ]
      },
      { "nome":"Largamente Definido - D", "tipo":4 ,
        list:[
          {"nome":"Desenvolvimento de Requisitos", "tipo":4},
          {"nome":"Projeto e Construção do Produto", "tipo":4},
          {"nome":"Integração do Produto", "tipo":4},
          {"nome":"Verificação", "tipo":4},
          {"nome":"Validação", "tipo":4}
        ]
      },
      { "nome":"Definido - C", "tipo":5 ,
        list:[
          {"nome":"Gerência de Decisões", "tipo":5 },
          {"nome":"Gerência de Riscos", "tipo":5 },
          {"nome":"Desenvolvimento para Reutilização", "tipo":5 }
        ]
      },
      { "nome":"Quantitativamente - B", "tipo":6 ,
        list:[
          {"nome":"Gerência de Projeto - (Evolução Quantitativamente)", "tipo":6 }
        ]
      },
      { "nome":"Otimização - A", "tipo":7 ,
        list:[
          {"nome":"Não Existe - Implantação de Inovações na Organização", "tipo":7 }
        ]
      }
          ];

      var processoCMMI_DEV = [
         { "nome":"Nível 2: Gerenciado / Gerido", "tipo":2 ,
           list:[
            {"nome":"Gerenciamento de Requisitos - REQM (Requirements Management)", "tipo":2},
            {"nome":"Planejamento de Projeto - PP (Project Planning)", "tipo":2},
            {"nome":"Acompanhamento e Controle de Projeto - PMC (Project Monitoring and Control)", "tipo":2},
            {"nome":"Gerenciamento de Acordo com Fornecedor - SAM (Supplier Agreement Management)", "tipo":2},
            {"nome":"Medição e Análise - MA (Measurement and Analysis)", "tipo":2},
            {"nome":"Garantia da Qualidade de Processo e Produto - PPQA (Process and Product Quality Assurance)", "tipo":2},
            {"nome":"Gerência de Configuração - CM (Configuration Management)", "tipo":2}
          ]},
          {"nome":"Nível 3: Definido:", "tipo":3,
            list:[
              {"nome":"Desenvolvimento de Requisitos - RD (Requirements Development)", "tipo":3},
              {"nome":"Solução Técnica - TS (Technical Solution)", "tipo":3},
              {"nome":"Integração de Produto - PI (Product Integration)", "tipo":3},
              {"nome":"Verificação - VER (Verification)", "tipo":3},
              {"nome":"Validação - VAL (Validation)", "tipo":3},
              {"nome":"Foco de Processo Organizacional - OPF (Organizational Process Focus)", "tipo":3},
              {"nome":"Definição de Processo Organizacional - OPD (Organizational Process Definition)", "tipo":3},
              {"nome":"Treinamento Organizacional - OT (Organizational Training)", "tipo":3},
              {"nome":"Gerenciamento Integrado de Projeto - IPM (Integrated Project Management)", "tipo":3},
              {"nome":"Gerenciamento de Riscos - RSKM (Risk Management)", "tipo":3},
              {"nome":"Análise de Decisão e Resolução - DAR (Decision Analysis and Resolution)", "tipo":3}
            ]
          },
          {"nome":"Nível 4: Quantitativamente gerenciado / Gerido quantitativamente", "tipo":4,
            list:[
              {"nome":"Desempenho de Processo Organizacional - OPP (Organizational Process Performance)", "tipo":4},
              {"nome":"Gerenciamento Quantitativo de Projeto - QPM (Quantitative Project Management)", "tipo":4}
            ]
          },
          {"nome":"Nível 5: Em otimização", "tipo":5,
            list:[
              {"nome":"Gestão do Desempenho Organizacional - OPM (Organizational Performance Management)", "tipo":5},
              {"nome":"Análise Causal e Resolução - CAR (Causal Analysis and Resolution)", "tipo":5}
            ]
          }                    
        ]

      var processoCOBIT = [
     { "nome":"EDM - Avaliar, Dirigir e Monitorar (5)", "tipo":1 ,
       list:[
         {"nome":"Garantir a definição e manutenção do modelo de governança", "tipo":1},
         {"nome":"Garantir a realização de benefícios", "tipo":1},
         {"nome":"Garantir a otimização do risco", "tipo":1},
         {"nome":"Garantir a otimização dos recursos", "tipo":1},
         {"nome":"Garantir transparência para as partes interessadas", "tipo":1}
          ]
     },
     { "nome":"APO - Alinhar, Planejar e Organizar (13)", "tipo":2 ,
       list:[
          {"nome":"Gerenciar a estrutura de gestão de TI", "tipo":2},
          {"nome":"Gerenciar a estratégia", "tipo":2},
          {"nome":"Gerenciar arquitetura da organização", "tipo":2},
          {"nome":"Gerenciar inovação", "tipo":2},
          {"nome":"Gerenciar portfólio", "tipo":2},
          {"nome":"Gerenciar orçamento e custos", "tipo":2},
          {"nome":"Gerenciar recursos humanos", "tipo":2},
          {"nome":"Gerenciar relacionamentos", "tipo":2},
          {"nome":"Gerenciar contratos de prestação de serviços", "tipo":2},
          {"nome":"Gerenciar fornecedores", "tipo":2},
          {"nome":"Gerenciar qualidade", "tipo":2},
          {"nome":"Gerenciar riscos", "tipo":2},
          {"nome":"Gerenciar segurança", "tipo":2}
        ]
      },
      { "nome":"BAI - Construir, Adquirir e Implementar (10)", "tipo":3 ,
        list:[
          {"nome":"Gerenciar programas e projetos", "tipo":3},
          {"nome":"Gerenciar definição de requisitos", "tipo":3},
          {"nome":"Gerenciar identificação e desenvolvimento de soluções", "tipo":3},
          {"nome":"Gerenciar disponibilidade e capacidade", "tipo":3},
          {"nome":"Gerenciar capacidade de mudança organizacional", "tipo":3},
          {"nome":"Gerenciar mudanças", "tipo":3},
          {"nome":"Gerenciar aceitação e transição da mudança", "tipo":3},
          {"nome":"Gerenciar conhecimento", "tipo":3},
          {"nome":"Gerenciar ativos", "tipo":3},
          {"nome":"Gerenciar configuração", "tipo":3}
        ]
      },
      { "nome":"DSS - Entregar, Serviços e Suporte (06)", "tipo":4 ,
        list:[
          {"nome":"Gerenciar operações", "tipo":4},
          {"nome":"Gerenciar solicitações e incidentes de serviços", "tipo":4},
          {"nome":"Gerenciar problemas", "tipo":4},
          {"nome":"Gerenciar continuidade", "tipo":4},
          {"nome":"Gerenciar serviços de segurança", "tipo":4},
          {"nome":"Gerenciar controle do processo de negócio", "tipo":4}
        ]
      },
      { "nome":"MEA - Monitorar, Avaliar e Analisar (03)", "tipo":5 ,
        list:[
          {"nome":"Monitorar, avaliar e analisar desempenho e continuidade", "tipo":5},
          {"nome":"Monitorar, avaliar e analisar o sistema de controle interno", "tipo":5},
          {"nome":"Monitorar, avaliar e analisar conformidade com requisitos externos.", "tipo":5}
        ]
      }
          ];

        return {
            getProcessoPMBOK: function () {
                return processoPMBOK;
            },
            getProcessoITILV3: function () {
                return processoITILV3;
            },
            getProcessoMPSBR: function () {
                return processoMPSBR;
            },
            getProcessoCOBIT: function () {
                return processoCOBIT;
            },
            getProcessoCMMIDEV: function () {
                return processoCMMI_DEV;
            }
        };
    }
})();
