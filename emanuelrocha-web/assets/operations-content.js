/*
 * Contenido de calibración para el archivador focal.
 *
 * Este archivo es deliberadamente independiente de la infraestructura. La
 * siguiente fase editorial puede sustituir títulos, tesis, explicaciones y
 * evidencias sin modificar el motor de navegación ni los renderizadores.
 */

export const operationsCatalog = {
    ca: {
        intro: "El resultat és la part visible. Abans cal entendre quina pregunta intenta respondre l’encàrrec, separar el que es pot comprovar del que se suposa, decidir què no mereix construir-se i deixar una solució que pugui continuar funcionant.",
        labels: {
            index: "Arxius d’operacions",
            open: "Obrir l’arxiu",
            thesis: "Tesi",
            proof: "Prova",
            limit: "Límit",
            reconstruction: "Reconstrucció",
            can: "Es pot sostenir",
            cannot: "No es pot sostenir",
            selected: "Opció seleccionada",
            archives: "← Arxius",
            previous: "← Anterior",
            next: "Següent →",
            contact: "Contacte →",
            progress: "Arxiu {current} de {total}",
            operations: "Operacions"
        },
        files: [
            {
                id: "op-01",
                num: "01",
                title: "Abans d’acceptar la solució",
                status: "Entrada",
                thesis: "La forma inicial de l’encàrrec és una hipòtesi; primer cal reconstruir el problema que intenta resoldre.",
                explanation: "La unitat comprova que l’arxiu pot combinar una tesi breu, una explicació llegible, una prova central i un límit sense convertir-se en un acordió. El contingut definitiu substituirà aquesta mostra en la fase editorial.",
                evidenceType: "reframe-matrix",
                evidenceLabel: "Petició inicial → pregunta reformulada",
                evidence: {
                    rows: [
                        { from: "Construir la peça demanada", to: "Què ha de canviar perquè la peça sigui necessària?" },
                        { from: "Afegir més informació", to: "Quina decisió no es pot prendre amb la informació actual?" },
                        { from: "Automatitzar el pas", to: "Què ha de continuar sota criteri humà?" }
                    ]
                },
                limit: "Mostra de calibració estructural. No acredita per si sola l’aplicació del mètode en un projecte concret."
            },
            {
                id: "op-02",
                num: "02",
                title: "Investigar per decidir",
                status: "Investigació",
                thesis: "La investigació comença amb una pregunta i acaba quan permet prendre una decisió delimitada.",
                explanation: "Aquesta unitat valida un recorregut seqüencial amb fonts, contradiccions i canvi de tesi. El renderitzador admet entre tres i cinc passos sense dependre d’il·lustracions ni d’una animació per ser comprensible.",
                evidenceType: "research-trail",
                evidenceLabel: "Recorregut de fonts i canvi de tesi",
                evidence: {
                    steps: [
                        { label: "Pregunta", detail: "Definir què cal saber i per a quina decisió." },
                        { label: "Fonts", detail: "Separar dades primàries, afirmacions i interpretacions." },
                        { label: "Contradicció", detail: "Registrar què no encaixa i per què importa." },
                        { label: "Tesi", detail: "Reformular la lectura amb els límits visibles." }
                    ]
                },
                limit: "El recorregut demostra la forma de lectura, no la qualitat d’una investigació encara no incorporada."
            },
            {
                id: "op-03",
                num: "03",
                title: "Decidir també és descartar",
                status: "Decisió",
                thesis: "Una decisió és verificable quan conserva les alternatives descartades i els supòsits que la sostenen.",
                explanation: "El comparador posa tres escenaris en el mateix nivell visual i destaca una elecció sense ocultar les altres. La jerarquia és textual i continua sent llegible amb moviment reduït o sense estils avançats.",
                evidenceType: "scenario-comparison",
                evidenceLabel: "Comparador de tres escenaris",
                evidence: {
                    scenarios: [
                        { label: "Escenari A", detail: "Intervenció mínima; manté el risc actual.", selected: false },
                        { label: "Escenari B", detail: "Resposta proporcionada; permet provar abans d’ampliar.", selected: true },
                        { label: "Escenari C", detail: "Més abast; augmenta cost, dependència i manteniment.", selected: false }
                    ]
                },
                limit: "La selecció és un exemple de disposició. Els criteris i la decisió real pertanyen al contingut definitiu."
            },
            {
                id: "op-04",
                num: "04",
                title: "Construir en versions",
                status: "Construcció",
                thesis: "La solució es construeix en estats que poden revisar-se abans de convertir-se en entrega.",
                explanation: "El flux comprova una cadena de quatre unitats connectades. Cada pas conserva una entrada i una sortida visibles, de manera que la representació pot créixer sin convertir-se en un diagrama il·legible en mòbil.",
                evidenceType: "workflow",
                evidenceLabel: "Entrada → transformació → sortida → revisió",
                evidence: {
                    steps: [
                        { label: "Entrada", detail: "Material, requisits i restriccions." },
                        { label: "Transformació", detail: "Criteris aplicats i decisions registrades." },
                        { label: "Sortida", detail: "Versió que ja es pot provar." },
                        { label: "Revisió", detail: "Errors, ajustos i decisió següent." }
                    ]
                },
                limit: "L’esquema no substitueix les versions ni els rastres reals que s’afegiran després."
            },
            {
                id: "op-05",
                num: "05",
                title: "Comprovar el que es pot sostenir",
                status: "Control",
                thesis: "La comprovació separa el treball realitzat dels resultats que no se li poden atribuir.",
                explanation: "La matriu de límits utilitza dues columnes simètriques en pantalles àmplies i una seqüència vertical en mòbil. La diferència no depèn només del color i els dos grups tenen un encapçalament explícit.",
                evidenceType: "claim-boundary",
                evidenceLabel: "Es pot sostenir / no es pot sostenir",
                evidence: {
                    can: ["La peça va ser construïda.", "La revisió prevista es va executar.", "El material final es va lliurar."],
                    cannot: ["Un resultat comercial no mesurat.", "Una causalitat que depèn de tercers.", "Una continuïtat sense seguiment."]
                },
                limit: "Els enunciats són mostres de calibració i no s’han d’interpretar com afirmacions sobre un cas real."
            },
            {
                id: "op-06",
                num: "06",
                title: "Entregar perquè continuï",
                status: "Continuïtat",
                thesis: "Una entrega és completa quan una altra persona pot utilitzar, revisar o mantenir el treball.",
                explanation: "El mapa final verifica una seqüència de punts de contacte i deixa preparada una sortida neutra cap al formulari general. La infraestructura no pressuposa que el visitant hagi recorregut cap de les dues rutes principals.",
                evidenceType: "journey-map",
                evidenceLabel: "Recorregut i punts de contacte",
                evidence: {
                    steps: [
                        { label: "Entrega", detail: "Versions finals i dependències." },
                        { label: "Activació", detail: "Instruccions mínimes per començar." },
                        { label: "Ús", detail: "Responsables i criteris compartits." },
                        { label: "Revisió", detail: "Moment i senyal per comprovar el sistema." },
                        { label: "Continuïtat", detail: "Decisions que queden en mans del client." }
                    ]
                },
                limit: "La representació prepara el lloc de la prova; l’autonomia només podrà afirmar-se amb documentació observable."
            }
        ]
    },
    es: {
        intro: "El resultado es la parte visible. Antes hay que entender qué pregunta intenta responder el encargo, separar lo comprobable de lo supuesto, decidir qué no merece construirse y dejar una solución que pueda seguir funcionando.",
        labels: {
            index: "Archivos de operaciones",
            open: "Abrir el archivo",
            thesis: "Tesis",
            proof: "Prueba",
            limit: "Límite",
            reconstruction: "Reconstrucción",
            can: "Puede sostenerse",
            cannot: "No puede sostenerse",
            selected: "Opción seleccionada",
            archives: "← Archivos",
            previous: "← Anterior",
            next: "Siguiente →",
            contact: "Contacto →",
            progress: "Archivo {current} de {total}",
            operations: "Operaciones"
        },
        files: [
            {
                id: "op-01",
                num: "01",
                title: "Antes de aceptar la solución",
                status: "Entrada",
                thesis: "La forma inicial del encargo es una hipótesis; primero hay que reconstruir el problema que intenta resolver.",
                explanation: "Esta unidad comprueba que el archivo puede combinar una tesis breve, una explicación legible, una prueba central y un límite sin convertirse en un acordeón. El contenido definitivo sustituirá esta muestra en la fase editorial.",
                evidenceType: "reframe-matrix",
                evidenceLabel: "Petición inicial → pregunta reformulada",
                evidence: {
                    rows: [
                        { from: "Construir la pieza solicitada", to: "¿Qué debe cambiar para que la pieza sea necesaria?" },
                        { from: "Añadir más información", to: "¿Qué decisión no puede tomarse con la información actual?" },
                        { from: "Automatizar el paso", to: "¿Qué debe continuar bajo criterio humano?" }
                    ]
                },
                limit: "Muestra de calibración estructural. No acredita por sí sola la aplicación del método en un proyecto concreto."
            },
            {
                id: "op-02",
                num: "02",
                title: "Investigar para decidir",
                status: "Investigación",
                thesis: "La investigación empieza con una pregunta y termina cuando permite tomar una decisión delimitada.",
                explanation: "Esta unidad valida un recorrido secuencial con fuentes, contradicciones y cambio de tesis. El renderizador admite entre tres y cinco pasos sin depender de ilustraciones ni de una animación para ser comprensible.",
                evidenceType: "research-trail",
                evidenceLabel: "Recorrido de fuentes y cambio de tesis",
                evidence: {
                    steps: [
                        { label: "Pregunta", detail: "Definir qué hay que saber y para qué decisión." },
                        { label: "Fuentes", detail: "Separar datos primarios, afirmaciones e interpretaciones." },
                        { label: "Contradicción", detail: "Registrar qué no encaja y por qué importa." },
                        { label: "Tesis", detail: "Reformular la lectura con sus límites visibles." }
                    ]
                },
                limit: "El recorrido demuestra la forma de lectura, no la calidad de una investigación todavía no incorporada."
            },
            {
                id: "op-03",
                num: "03",
                title: "Decidir también es descartar",
                status: "Decisión",
                thesis: "Una decisión es verificable cuando conserva las alternativas descartadas y los supuestos que la sostienen.",
                explanation: "El comparador sitúa tres escenarios en el mismo nivel visual y destaca una elección sin ocultar las demás. La jerarquía es textual y sigue siendo legible con movimiento reducido o sin estilos avanzados.",
                evidenceType: "scenario-comparison",
                evidenceLabel: "Comparador de tres escenarios",
                evidence: {
                    scenarios: [
                        { label: "Escenario A", detail: "Intervención mínima; mantiene el riesgo actual.", selected: false },
                        { label: "Escenario B", detail: "Respuesta proporcionada; permite probar antes de ampliar.", selected: true },
                        { label: "Escenario C", detail: "Mayor alcance; aumenta coste, dependencia y mantenimiento.", selected: false }
                    ]
                },
                limit: "La selección es un ejemplo de disposición. Los criterios y la decisión real pertenecen al contenido definitivo."
            },
            {
                id: "op-04",
                num: "04",
                title: "Construir en versiones",
                status: "Construcción",
                thesis: "La solución se construye en estados que pueden revisarse antes de convertirse en entrega.",
                explanation: "El flujo comprueba una cadena de cuatro unidades conectadas. Cada paso conserva una entrada y una salida visibles, de modo que la representación puede crecer sin convertirse en un diagrama ilegible en móvil.",
                evidenceType: "workflow",
                evidenceLabel: "Entrada → transformación → salida → revisión",
                evidence: {
                    steps: [
                        { label: "Entrada", detail: "Material, requisitos y restricciones." },
                        { label: "Transformación", detail: "Criterios aplicados y decisiones registradas." },
                        { label: "Salida", detail: "Versión que ya puede probarse." },
                        { label: "Revisión", detail: "Errores, ajustes y siguiente decisión." }
                    ]
                },
                limit: "El esquema no sustituye las versiones ni los rastros reales que se incorporarán después."
            },
            {
                id: "op-05",
                num: "05",
                title: "Comprobar lo que puede sostenerse",
                status: "Control",
                thesis: "La comprobación separa el trabajo realizado de los resultados que no pueden atribuírsele.",
                explanation: "La matriz de límites utiliza dos columnas simétricas en pantallas amplias y una secuencia vertical en móvil. La diferencia no depende solo del color y ambos grupos tienen un encabezado explícito.",
                evidenceType: "claim-boundary",
                evidenceLabel: "Puede sostenerse / no puede sostenerse",
                evidence: {
                    can: ["La pieza fue construida.", "La revisión prevista se ejecutó.", "El material final fue entregado."],
                    cannot: ["Un resultado comercial no medido.", "Una causalidad dependiente de terceros.", "Una continuidad sin seguimiento."]
                },
                limit: "Los enunciados son muestras de calibración y no deben interpretarse como afirmaciones sobre un caso real."
            },
            {
                id: "op-06",
                num: "06",
                title: "Entregar para que continúe",
                status: "Continuidad",
                thesis: "Una entrega está completa cuando otra persona puede utilizar, revisar o mantener el trabajo.",
                explanation: "El mapa final verifica una secuencia de puntos de contacto y deja preparada una salida neutra hacia el formulario general. La infraestructura no presupone que el visitante haya recorrido ninguna de las dos rutas principales.",
                evidenceType: "journey-map",
                evidenceLabel: "Recorrido y puntos de contacto",
                evidence: {
                    steps: [
                        { label: "Entrega", detail: "Versiones finales y dependencias." },
                        { label: "Activación", detail: "Instrucciones mínimas para comenzar." },
                        { label: "Uso", detail: "Responsables y criterios compartidos." },
                        { label: "Revisión", detail: "Momento y señal para comprobar el sistema." },
                        { label: "Continuidad", detail: "Decisiones que quedan en manos del cliente." }
                    ]
                },
                limit: "La representación prepara el lugar de la prueba; la autonomía solo podrá afirmarse con documentación observable."
            }
        ]
    }
};

export const operationEvidenceTypes = [
    "reframe-matrix",
    "research-trail",
    "scenario-comparison",
    "workflow",
    "claim-boundary",
    "journey-map"
];
