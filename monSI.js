// Sample startBlock or startRound values
//startingBlockNumber = 7745129	// Redistribution contract deployment block
//startingBlockNumber = 7753068	// First Commit transaction on Redistribution contract
//startingBlockNumber = 51029*blocksPerRound		// First round to credit the winner
//startingBlockNumber = 51232*blocksPerRound		// First round to have a slash
//startingBlockNumber = Math.min(7786054, 7787724, 7786660, 7787122) // My nodes' first rounds

//startingBlockNumber = 51323*blocksPerRound	// Recent slash followed by freeze
//startingBlockNumber = 51333*blocksPerRound	// Frozen testing


// These constants drive the environment to monitor
const redistributionContract = "0xF4963031E8b9f9659CB6ed35E53c031D76480EAD".toLowerCase()
const stakeRegistryContract = "0x18391158435582D5bE5ac1640ab5E2825F68d3a4".toLowerCase()
const gBZZTokenContract = "0x2aC3c1d3e24b45c6C310534Bc2Dd84B5ed576335".toLowerCase()
const postageStampContract = "0x7aAC0f092F7b961145900839Ed6d54b1980F200c".toLowerCase()
const BlockRate = 12	// Expected rate of blocks from chain (12 for goerli, 5 for gnosis, ?? for mainnet)

const RedistributionABI = [{"inputs":[{"internalType":"address","name":"staking","type":"address"},{"internalType":"address","name":"postageContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_count","type":"uint256"}],"name":"CountCommits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_count","type":"uint256"}],"name":"CountReveals","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"l","type":"string"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"l","type":"string"},{"indexed":false,"internalType":"bytes32","name":"b","type":"bytes32"}],"name":"LogBytes32","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"uint8","name":"depth","type":"uint8"}],"name":"TruthSelected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"stakeDensity","type":"uint256"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint8","name":"depth","type":"uint8"}],"indexed":false,"internalType":"struct Redistribution.Reveal","name":"winner","type":"tuple"}],"name":"WinnerSelected","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PostageContract","outputs":[{"internalType":"contract PostageStamp","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Stakes","outputs":[{"internalType":"contract StakeRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_obfuscatedHash","type":"bytes32"},{"internalType":"bytes32","name":"_overlay","type":"bytes32"}],"name":"commit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentClaimRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentCommitRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentCommits","outputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"bytes32","name":"obfuscatedHash","type":"bytes32"},{"internalType":"bool","name":"revealed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhaseClaim","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhaseCommit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhaseReveal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRevealRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"currentReveals","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"stakeDensity","type":"uint256"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint8","name":"depth","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundAnchor","outputs":[{"internalType":"bytes32","name":"returnVal","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundReveals","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"stakeDensity","type":"uint256"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint8","name":"depth","type":"uint8"}],"internalType":"struct Redistribution.Reveal[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentSeed","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"A","type":"bytes32"},{"internalType":"bytes32","name":"B","type":"bytes32"},{"internalType":"uint8","name":"minimum","type":"uint8"}],"name":"inProximity","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint8","name":"depth","type":"uint8"}],"name":"isParticipatingInUpcomingRound","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_overlay","type":"bytes32"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextSeed","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_overlay","type":"bytes32"},{"internalType":"uint8","name":"_depth","type":"uint8"},{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"internalType":"bytes32","name":"_revealNonce","type":"bytes32"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"roundLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winner","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"stakeDensity","type":"uint256"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint8","name":"depth","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_overlay","type":"bytes32"},{"internalType":"uint8","name":"_depth","type":"uint8"},{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"internalType":"bytes32","name":"revealNonce","type":"bytes32"}],"name":"wrapCommit","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"}]
const StakeRegistryABI = [{"inputs":[{"internalType":"address","name":"_bzzToken","type":"address"},{"internalType":"uint64","name":"_NetworkId","type":"uint64"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"slashed","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StakeFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"slashed","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StakeSlashed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"overlay","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"lastUpdatedBlock","type":"uint256"}],"name":"StakeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REDISTRIBUTOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bzzToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"bytes32","name":"nonce","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"time","type":"uint256"}],"name":"freezeDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"}],"name":"lastUpdatedBlockNumberOfOverlay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"}],"name":"ownerOfOverlay","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"slashDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"}],"name":"stakeOfOverlay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"stakes","outputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"lastUpdatedBlockNumber","type":"uint256"},{"internalType":"bool","name":"isValue","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"}],"name":"usableStakeOfOverlay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"overlay","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromStake","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const gBZZTokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"},{"name":"_cap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

const blocksPerRound = 152

var preloadRounds = 0		// Startup can take a LONG time if you make this large!
var startingBlockNumber = 0	// Unless overridden by arguement below

if (process.argv.length < 3) {
	console.error(`Usage: ${process.argv[0]} ${process.argv[1]} rpcURL(websocket) <HighlightOverlays...> <options>`)
	console.error('Valid options are:')
	console.error('    --preloadRounds N          Number of rounds to load before current round')
	console.error('    --startBlock N             Block number to start loading')
	console.error('    --startRound N             Round number to start loading; each round is ${blocksPerRound} blocks')
	console.error('')
	console.error(`for example: ${process.argv[0]} ${process.argv[1]} ws://localhost:8545 6a7c4d45064a382fdd6913fcfdf631b9cacd163c02f9207dee219ef63e953e43 0xB7563E747205FA41E3C59ADCEC667AA5D7415A8E1F4A61B35232486FF49F7C7B 828bec0209b77c751b8e41cd1e4004e902db05a8a7323f53ddf3d1d3dbb7f412 --preloadRounds 4`)
	process.exit(-1)
}

const rpcURL = process.argv[2]
var highlightOverlays = []

const allColors = ["black","red","green","yellow","blue","magenta","cyan","white"]
const hColor = 'yellow'	// The highlight color

for (var i=3; i<process.argv.length; i++)
{
	if (process.argv[i] == '--preloadRounds')
		preloadRounds = Number(process.argv[++i])	// Startup can take a LONG time if you make this large!
	else if (process.argv[i] == '--startBlock')
		startingBlockNumber = Number(process.argv[++i])
	else if (process.argv[i] == '--startRound')
		startingBlockNumber = Number(process.argv[++i])*blocksPerRound
	else if (process.argv[i].slice(0,1) == '-') {
		console.error('Invalid option ${process.argv[i]}')
		process.exit(-1)
	}
	else
	{
		var overlay = process.argv[i].toLowerCase()
		if (overlay.slice(0,2) != '0x') overlay = '0x'+overlay
		if (overlay.length != '0x47d48ff50fcfe118ecadb97d6cefe17397a0eeb554e4112b7a24d14ded8451bc'.length) {
			console.error('Invalid overlay ${overlay}')
			process.exit(-1)
		}
		if (!highlightOverlays.includes(overlay)) highlightOverlays[highlightOverlays.length] = overlay
	}
}


//import blessed from 'blessed';
const blessed = require('blessed')

function isUndefined(value){
    // Obtain `undefined` value that's
    // guaranteed to not have been re-assigned
    var undefined = void(0);
    return value === undefined;
}

function specificLocalTime(when)
{
	return when.toLocaleTimeString('en-GB')	// en-GB gets a 24hour format, but amazingly local time!
}

function currentLocalTime()
{
	return specificLocalTime(new Date())
}

function shortID(id, n)
{
	if (typeof(id) != 'string') return id
	if (id.substring(0,2) == '0x') id = id.substring(2)
	if (id.length <= n*2) return id
	return id.substring(0,n)+".."+id.substring(id.length-n)
}

function leftID(id, n)
{
	if (typeof(id) != 'string') return id
	if (id.substring(0,2) == '0x') id = id.substring(2)
	if (id.length <= n) return id
	return id.substring(0,n-3)+"..."
}

function shortNum(n,plus)
{
	if (typeof(n) != "number") return typeof(n)+'('+n+')'
	
	var negative, result
	if (n < 0)
	{	negative = true
		n = -n
	}

	//if (n >= 100*1000*1000*1000*1000*1000)
	//	result = (n/(1000*1000*1000*1000*1000)).toFixed(0)+'q'
	//else if (n >= 10*1000*1000*1000*1000*1000)
	//	result = (n/(1000*1000*1000*1000*1000)).toFixed(1)+'q'
	//else if (n >= 1*1000*1000*1000*1000*1000)
	//	result = (n/(1000*1000*1000*1000*1000)).toFixed(2)+'q'

	//else
	if (n >= 100*1000*1000*1000*1000)
		result = (n/(1000*1000*1000*1000)).toFixed(0)+'t'
	else if (n >= 10*1000*1000*1000*1000)
		result = (n/(1000*1000*1000*1000)).toFixed(1)+'t'
	else if (n >= 1*1000*1000*1000*1000)
		result = (n/(1000*1000*1000*1000)).toFixed(2)+'t'

	else if (n >= 100*1000*1000*1000)
		result = (n/(1000*1000*1000)).toFixed(0)+'b'
	else if (n >= 10*1000*1000*1000)
		result = (n/(1000*1000*1000)).toFixed(1)+'b'
	else if (n >= 1*1000*1000*1000)
		result = (n/(1000*1000*1000)).toFixed(2)+'b'

	else if (n >= 100*1000*1000)
		result = (n/(1000*1000)).toFixed(0)+'m'
	else if (n >= 10*1000*1000)
		result = (n/(1000*1000)).toFixed(1)+'m'
	else if (n >= 1*1000*1000)
		result = (n/(1000*1000)).toFixed(2)+'m'

	else if (n >= 100*1000)
		result = (n/(1000)).toFixed(0)+'k'
	else if (n >= 10*1000)
		result = (n/(1000)).toFixed(1)+'k'
	else if (n >= 1*1000)
		result = (n/(1000)).toFixed(2)+'k'
		
	else result = ''+n
	
	if (negative) result = "-"+result
	else if (plus) result = "+"+result
	return result
}

function wholeBZZ(bzz)
{
	while (bzz.length <= 16) {
		bzz = '0' + bzz
	}
	bzz = bzz.slice(0,bzz.length-16)+"."+bzz.slice(bzz.length-16)
	while (bzz.slice(-1) == '0') {
		bzz = bzz.slice(0,-1)
	}
	if (bzz.slice(-1) == '.') bzz = bzz + '0'
	return bzz
}

function shortBZZ(n,plus)	// BZZ token has 16 decimal places, javascript MAX_SAFE_INTEGER = 900719925474099 - strange that ths works!
{
	const oneBZZ = 10000000000000000
	
	if (typeof(n) != "number") return typeof(n)+'('+n+')'
	
	var negative, result
	if (n < 0)
	{	negative = true
		n = -n
	}
	
	if (n < oneBZZ/100) return shortNum(n,plus)
		
	else if (n >= 100*oneBZZ)
		result = (n/(oneBZZ)).toFixed(0)+'bzz'
	else if (n >= 10*oneBZZ)
		result = (n/(oneBZZ)).toFixed(1)+'bzz'
	else if (n >= 1*oneBZZ)
		result = (n/(oneBZZ)).toFixed(2)+'bzz'
	else
		result = (n/(oneBZZ)).toFixed(3)+'bzz'
	
	if (negative) result = "-"+result
	else if (plus) result = "+"+result
	return result
}

function shortETH(n,plus)	// ETH has 18 decimal places, javascript MAX_SAFE_INTEGER = 900719925474099 - strange that this works!
{
	const oneETH = 1000000000000000000
	
	if (typeof(n) != "number") return typeof(n)+'('+n+')'
	
	var negative, result
	if (n < 0)
	{	negative = true
		n = -n
	}
	
	if (n < oneETH/100) return shortNum(n,plus)
		
	else if (n >= 100*oneETH)
		result = (n/(oneETH)).toFixed(0)+'bzz'
	else if (n >= 10*oneETH)
		result = (n/(oneETH)).toFixed(1)+'bzz'
	else if (n >= 1*oneETH)
		result = (n/(oneETH)).toFixed(2)+'bzz'
	else
		result = (n/(oneETH)).toFixed(3)+'bzz'
	
	if (negative) result = "-"+result
	else if (plus) result = "+"+result
	return result
}



var screen = blessed.screen({
  smartCSR: true,
  dockBorders : true,
});

screen.title = 'monSI';

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


var boxCount = 0
var boxes = []	// for focus tabbing
var boxFocus = 0
var boxColors = [ 'white', 'blue', 'red', 'green', 'magenta', 'yellow' ]
var boxWidth = 45

screen.key(['tab'], function (ch, key) {
	if (boxCount > 0) {
		boxes[boxFocus].style.border.fg = 'white'
		boxFocus = (boxFocus+1)%boxCount
		boxes[boxFocus].style.border.fg = 'green'
		screen.render()
	}
})

var numWidth = 3		// This is horizontal boxes
var numLines = 10		// This is per box

function createBox(URL)
{

// Create a box for the node
	var box = blessed.box({
	  parent: screen,
	  mouse: true,
	  keys: true,
	  vi: true,
	  left: (boxCount%numWidth)*boxWidth,
	  top: Math.trunc(boxCount/numWidth)*(numLines+1),
	  width: boxWidth+1,
	  height: (numLines+2),
	  content: '{center}'+URL+'{/center}',
	  tags: true,
	  border: {
		type: 'line'
	  },
	  style: {
		fg: 'brightwhite',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	// Append our box to the screen.
	screen.append(box);

	// Focus our element.
	box.focus();
	boxFocus = boxCount	// index of focussed box
	boxes[boxCount] = box	// For later focus tabbing
	
box.key(['c'], function (ch, key) {
	showError(JSON.stringify(ch)+' Got key '+JSON.stringify(key))
})

	boxCount = boxCount + 1

	return box
}

var playersBox, roundsBox, winnersBox, outputBox, blocksBox

function addBoxes()
{

	winnersBox = blessed.box({
		
	  title: "Winners",
	  label: "Winners",
	  
	  top: 0,
	  left: '75%',
	  //left: numWidth*boxWidth,
	  //width: '100%-'+(numWidth*boxWidth),
	  width: '25%',
	  height: '100%',

	  content: '\n{center}'+rpcURL+'{/center}', // \n\n\nThreshold: '+shortNum(0)+'\nEarly:     '+shortNum(10)+'\nTrigger:   '+shortNum(100)+'\nBalance {cyan-fg}99%{/cyan-fg}: ~{cyan-fg}'+shortNum((100) * 0.99)+'{/cyan-fg}\nBalance {yellow-fg}98%{/yellow-fg}: ~{yellow-fg}'+shortNum((100) * 0.98)+'{/yellow-fg}',
	  scrollable: true,
	  tags: true,
	  border: {
		type: 'line'
	  },
	  style: {
		fg: 'brightwhite',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	screen.append(winnersBox);

	roundsBox = blessed.box({
		
	  title: "Rounds",
	  label: "Rounds",
	  
	  top: 0,
	  left: '40%',
	  width: '35%',
	  height: '75%',

	  //content: '\nhh:mm:ss 51316(83) 1-1 1 df6c1b18c... ^2 +7.99t\nhh:mm:ss 51315(83) 4-4 4 828bec020... ^2 +8.04t\nhh:mm:ss 51314(82) 4-4 1+1+1+1=3 179ef3b3b... ^1 +7.89t',
	  content: '',
	  scrollable: true,
	  tags: true,
	  border: {
		type: 'line'
	  },
	  style: {
		fg: 'brightwhite',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	screen.append(roundsBox);

	playersBox = blessed.box({
		
	  title: "Players",
	  label: "Players",
	  
	  top: 0,
	  left: 0,
	  width: '40%',
	  height: '75%',

	  //content: '\n22:34:01 51316(83) Player df6c1b18cc21d... claim 2 dc40224af7b1f5fc..a44c5debadc74b75\n22:33:52 51316(45) Player df6c1b18cc21d... reveal 2 dc40224af7b1f5fc..a44c5debadc74b75\n22:33:43 51316(11) Player df6c1b18cc21d... commit 0 5b46e618471c9f32..97ec95dce6876f8a',
	  content: '',
	  scrollable: false,
	  tags: true,
	  border: {
		type: 'line'
	  },
	  style: {
		fg: 'brightwhite',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	screen.append(playersBox);

	blocksBox = blessed.box({
	  top: '75%',
	  left: '55%',
	  width: '20%',
	  height: '100%',
	  content: 'hh:mm:ss bbbbbbb nns mmmms',
	  scrollable: true,
	  tags: true,
	  style: {
		fg: 'white',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	screen.append(blocksBox);

let colors = 'Colors:'
let brights = 'Brights:'
allColors.forEach(c => {if (c=='black') colors = colors+` {white-bg}{${c}-fg}${c}{/${c}-fg}{/white-bg}`; else colors = colors+` {${c}-fg}${c}{/${c}-fg}`})
allColors.forEach(c => {if (c=='black') brights = brights+` {white-bg}{bright-${c}-fg}${c}{/bright-${c}-fg}{/white-bg}`; else brights = brights+` {bright-${c}-fg}${c}{/bright-${c}-fg}`})

	outputBox = blessed.box({
	  //top: Math.trunc((boxCount+numWidth-1)/numWidth)*(numLines+1)+1,
	  //left: 0,
	  //width: numWidth*boxWidth,
	  //height: '100%',
	  top: '75%',
	  left: 0,
	  width: blocksBox?'55%':'75%',
	  height: '100%',
	  content: `{left}error and trace\noutput will appear here\nand scroll down\n${colors}\n${brights}{/left}`,
	  scrollable: true,
	  tags: true,
	  style: {
		fg: 'white',
		bg: 'black',	// Was magenta
		border: {
		  fg: '#f0f0f0'
		},
		hover: {
		  bg: 'green'
		}
	  }
	});

	screen.append(outputBox);
}


function setWinnersLineTime(index,when,text)	// Caller is expected to trigger the render
{
	var line = (isUndefined(when)?'        ':specificLocalTime(when)) + ' ' + text
	winnersBox.setLine(index, line);
}

function setWinnersLine(index,text)
{
	var line = currentLocalTime()+' '+text
	winnersBox.setLine(index, line);
	screen.render()
}

function addWinnersLine(index,text)
{
	var line = currentLocalTime()+' '+text
	winnersBox.insertLine(index, line);
	screen.render()
}


const debugging = false
var lastErrorTag = ""

function showError(text, tag, time)
{
	if (!time) time = new Date()

	if (typeof(text) != 'string')
		text = JSON.stringify(text, undefined, 2)
	var line = specificLocalTime(time)+' '+text
	if (debugging) console.error(line)
	if (!isUndefined(tag) && tag == lastErrorTag)
	{	
		outputBox.setLine(0, line);
		lastErrorTag = tag
	} else
	{
		outputBox.insertLine(0, line);
		lastErrorTag = !isUndefined(tag)?tag:""
	}
	screen.render()
}

const logEnabled = false
function showLog(text)
{
	if (typeof(text) != 'string')
		text = JSON.stringify(text, undefined, 2)
	if (logEnabled) console.error(currentLocalTime()+' '+text)
}

function showLogError(text)
{
	if (typeof(text) != 'string')
		text = JSON.stringify(text, undefined, 2)
	if (!debugging) showLog(text)
	showError(text)
}

function colorValue(value, forcePlus, fmtRtn)
{
	if (!fmtRtn) fmtRtn = shortNum
	if (value < 0)
	{	return '{red-fg}'+fmtRtn(value)+'{/red-fg}'
	} else if (value > 0)
	{	if (isUndefined(forcePlus))
		{	return '{green-fg}'+fmtRtn(value)+'{/green-fg}'
		}
		return '{green-fg}+'+fmtRtn(value)+'{/green-fg}'
	}
	if (isUndefined(forcePlus))
		return '{white-fg}'+fmtRtn(value)+'{/white-fg}'
	else return '{white-fg}+'+fmtRtn(value)+'{/white-fg}'
}

function colorSpecificDelta(previousValue, value, forcePlus, fmtRtn)
{
	var delta = value - previousValue
	if (delta != 0)
	{
		return ' ('+colorValue(delta, forcePlus, fmtRtn)+')'
	}
	return ''
}

var lastValues = {}

function clearDelta(name)
{
	lastValues[name] = void(0)
}

function valueChanged(name, value)
{
	if (isUndefined(lastValues[name])) return true;
	return lastValues[name] != value;
}

function colorDelta(name, value, forcePlus, fmtRtn)
{
	if (isUndefined(lastValues[name]))
	{	lastValues[name] = value
		return ''
	}
	
	var delta = value - lastValues[name]
	lastValues[name] = value;
	if (delta != 0)
	{
		return ' ('+colorValue(delta, forcePlus, fmtRtn)+')'
	}
	return ''
}








var monitorAddresses = []
monitorAddresses.push(redistributionContract.toLowerCase())
monitorAddresses.push(stakeRegistryContract.toLowerCase())
monitorAddresses.push(gBZZTokenContract.toLowerCase())
//monitorAddresses.push(postageStampContract.toLowerCase())	// I don't think I want to monitor this one, but I want it named

const monitorAddresses1 = ["0x62b32288d5292708de7443f78f6714c95e4c75ff","0x830e313ccab2140f72cbfe2dc44bbe0014cd245b","0xc9f8b6297dc6a55846014d326c59c04627380e87","0xa5e44b91b4790fa21765a204024281e75569f224"]
monitorAddresses1.forEach(add => monitorAddresses.push(add.toLowerCase()))

function formatAccount(account,n)
{
	account = account.toLowerCase()
	if (account == redistributionContract)
		return 'Redistribution'
	if (account == stakeRegistryContract)
		return 'StakeRegistry'
	if (account == gBZZTokenContract)
		return 'gBZZToken'
	if (account == postageStampContract)
		return 'PostageStamp'
	var result = leftID(account,n)
	var overlay = getAccountOverlay(account)
	if (overlay && highlightOverlays.includes(overlay.toLowerCase())) {
		result = `{${hColor}-fg}${result}{/${hColor}-fg}`
	}
	return result
}


function formatOverlay(overlay,n)
{
	if (overlay.slice(0,2) != '0x') overlay = '0x'+overlay
	var result = leftID(overlay,n)
	if (highlightOverlays.includes(overlay.toLowerCase())) {
		result = `{${hColor}-fg}${result}{/${hColor}-fg}`
	}
	return result
}

function formatAccountPlusOverlay(account,n)
{
	if (account.slice(0,2) != '0x') account = '0x'+account
	const overlay = getAccountOverlay(account)
	if (overlay) return formatAccount(account,n/2) + "("+formatOverlay(overlay,n)+")"
	else return formatAccount(account,n)
}



var Winners = []

function refreshWinners(winner)
{
	if (winner) winner.text = formatWinner(winner)
	Winners.sort(function(l,r){
		if (l.overlay == r.overlay) return 0
		if (l.highlight && !r.highlight) return -1
		if (!l.highlight && r.highlight) return 1
		if (l.overlay < r.overlay) return -1
		if (l.overlay > r.overlay) return 1
	})
	for (var i=0; i<Winners.length; i++)
	{
		Winners[i].line = i
		setWinnersLineTime(Winners[i].line, Winners[i].when, Winners[i].text)
	}
	screen.render()
}

function formatWinner(winner)
{
	var result = formatOverlay(winner.overlay,12)
	if (!isUndefined(winner.winCount) && !isUndefined(winner.playCount)) result = result + ` ${winner.winCount}/${winner.playCount}`
	if (winner.freezeCount && winner.freezeCount > 0) result = result + ` {cyan-fg}${winner.freezeCount}{/cyan-fg}`
	if (winner.slashCount && winner.slashCount > 0) result = result + ` {red-fg}${winner.slashCount}{/red-fg}`
	if (winner.amount != 0) result = result + " " + colorValue(winner.amount, false, shortBZZ)+colorDelta(winner.overlay+':amount', winner.amount, true, shortBZZ)
	if (winner.frozen) {
		if (winner.freezeTarget) result = result + ` {cyan-fg}~${winner.freezeTarget}{/cyan-fg}`
		else result = result + " {cyan-fg}FROZEN{/cyan-fg}"
	}
	return result
}

function getWinner(blockTime, overlay, account)
{
	if (!overlay) return undefined
	
	for (var i=0; i<Winners.length; i++)
	{
		if (Winners[i].overlay == overlay) {
			if (isUndefined(Winners[i].account)) {
				Winners[i].account = account
			}
			if (Winners[i].account == account) {
				Winners[i].when = blockTime
				Winners[i].frozen = undefined
				return Winners[i]
			}
		}
	}
	const winner = {when: blockTime, overlay: overlay, account: account, amount: 0, highlight: highlightOverlays.includes(overlay.toLowerCase())}
	Winners[Winners.length] = winner

	winner.text = formatWinner(Winners[Winners.length-1])
	addWinnersLine(Winners.length-1, Winners[Winners.length-1].text)
	
	return Winners[Winners.length-1]
}

function updateWinner(blockTime, overlay, account, amount)
{
	if (typeof(amount) == 'string') amount = Number(amount)

	const winner = getWinner(blockTime, overlay, account)
	if (!winner) return
	if (isUndefined(amount)) {
		if (!winner.playCount) winner.playCount = 1
		else winner.playCount++
		if (!winner.winCount) winner.winCount = 0
	} else {
		winner.amount += amount
		if (amount < 0) {
			if (!winner.slashCount) winner.slashCount = 1
			else winner.slashCount++
		}
		else if (amount >= 0) {
			if (!winner.playCount) winner.playCount = 1
			if (!winner.winCount) winner.winCount = 1
			else winner.winCount++
		}
	}
	refreshWinners(winner)
}

function freezeWinner(blockTime, overlay, account, blockNumber, time)
{
	if (typeof(time) == 'string') time = Number(time)

	const winner = getWinner(blockTime, overlay, account)
	if (!winner) return
	winner.frozen = true
	winner.freezeTarget = blockNumber + time + blocksPerRound
	if (!winner.freezeCount) winner.freezeCount = 1
	else winner.freezeCount++
	refreshWinners(winner)
}

function getAccountOverlay(account)
{
	for (var i=0; i<Winners.length; i++)
	{
		if (Winners[i].account == account)
			return Winners[i].overlay
	}
	return undefined
}


var Rounds = []

//Rounds[Rounds.length] = { when: new Date(), id: block%blocksPerRound, commits: 0, reveals: 0, slashes: 0, hashes: [ {hash: "0", count: 1}, {hash: "1", count: 1} ], freezes: 1, reward: 0 }

function formatRound(round)
{
//	addRound((PlayersRound+1)*blocksPerRound, new Date(), PlayersCommits, PlayersReveals, 0, 0, 0, undefined, undefined, undefined, undefined)

	var result = `${round.id}(${round.residual}) ${round.commits}-${round.reveals}`
	if (round.slashes > 0) result = result + `={red-fg}${round.slashes}{/red-fg}`
	var sameDepth = true
	for (var i=0; i<round.hashes.length; i++)
		if (round.hashes[i].depth != round.hashes[0].depth)
			sameDepth = false
	for (var i=0; i<round.hashes.length; i++)
	{
		if (i>0) result = result + '+'
		else result = result + ' '
		var term = `${round.hashes[i].count}`
		if (!sameDepth) term = term + `^${round.hashes[i].depth}`
		if (round.hashes[i].hash == round.truth)
			term = `{green-fg}${term}{/green-fg}`
		else term = `{red-fg}${term}{/red-fg}`
		if (round.hashes[i].highlight
		&& (round.hashes.length > 1 || round.hashes[i].count > 1))
			term = `{${hColor}-bg}${term}{/${hColor}-bg}`
		result = result + term
	}
	if (round.freezes > 0) result = result + `={cyan-fg}${round.freezes}{/cyan-fg}`
	if (round.winner) {
		result = result + ` ${formatOverlay(round.winner,12)}`
		if (round.depth) result = result + ` ^${round.depth}`
		if (!isUndefined(round.reward)) result = result + ' {green-fg}' + shortNum(round.reward,true) + '{/green-fg}'
	} else result = result + ' {yellow-fg}UNCLAIMED{/yellow-fg}'
	return result
}

function roundFromBlock(blockNumber)
{
	return Math.floor(blockNumber/blocksPerRound)
}
function roundString(blockNumber)
{
	return `${roundFromBlock(blockNumber)}(${blockNumber%blocksPerRound})`
}

var LastRoundID = 0

function addRound(blockNumber, blockTime, commits, reveals, slashes, hashes, freezes, truth, depth, reward, winner)
{
	const id = roundFromBlock(blockNumber)
	if (LastRoundID == id) return		// Ignore duplicate end-of-round reports
	LastRoundID = id
	if (typeof(reward) == 'string') reward = Number(reward)
	const round = { when: blockTime, id: id, residual: blockNumber%blocksPerRound, commits: commits, reveals: reveals, slashes: slashes, hashes: hashes, freezes: freezes, truth: truth, depth: depth, reward: reward, winner: winner }
	//showError(`${formatRound(round)}`)
	
	var line = specificLocalTime(round.when)+' '+formatRound(round)
	roundsBox.insertLine(0, line);
	screen.render()
}

var Hashes = []
var HashRound = 0

function clearHashes()
{
	Hashes = []
}

function addHash(blockNumber, hash, depth, highlight)
{
	const round = roundFromBlock(blockNumber)
	if (round != HashRound)
		clearHashes()
	HashRound = round
	
	for (var h=0; h<Hashes.length; h++)
	{
		if (Hashes[h].hash == hash && Hashes[h].depth == depth) {
			Hashes[h].count++
			if (highlight) Hashes[h].highlight = highlight
			return
		}
	}
	//showError(`${roundString(blockNumber)} new hash ${shortID(hash,16)}`)
	Hashes[Hashes.length] = {hash: hash, depth: depth, count: 1, highlight: highlight}
}

var Players = []
var PlayersRound = 0
var PlayersCommits = 0
var PlayersReveals = 0

function clearPlayers()
{
	for (var i=0; i<Players.length; i++)
		playersBox.setLine(i+1,'')
	Players = []
	PlayersCommits = 0
	PlayersReveals = 0
}

async function updatePlayer(p)
{
	const player = Players[p]
	var text = `${roundString(player.blockNumber)} ${formatOverlay(player.overlay,12)} ${player.phase}`
	if (player.depth) text = text + ` ^${player.depth}`
	if (player.hash) text = text + ` ${shortID(player.hash,10)}`
	const line = specificLocalTime(player.when)+' '+text
	playersBox.setLine(p+1, line);
}

async function flushPreviousRound(blockTime, blockNumber)
{
	const round = roundFromBlock(blockNumber)
	if (round != PlayersRound) {
		if (PlayersRound != 0) {
			if (PlayersCommits || PlayersReveals) {
				addRound((PlayersRound+1)*blocksPerRound-1, blockTime, PlayersCommits, PlayersReveals, 0, Hashes, 0, undefined, undefined, undefined, undefined)
				clearHashes()
			}
		}
		clearPlayers()
	}
	PlayersRound = round
}

async function updatePlayerRound(blockTime, blockNumber)
{
	flushPreviousRound(blockTime, blockNumber)

	const offset = blockNumber % blocksPerRound
	var phase
	var length
	var elapsed
	if (offset < blocksPerRound / 4) {
		phase = 'commit'
		length = blocksPerRound / 4
		elapsed = offset + 1
	} else if (offset <= blocksPerRound / 2) {
		phase = 'reveal'
		length = blocksPerRound / 4 + 1
		elapsed = offset - blocksPerRound / 4 + 1
	} else {
		phase = 'claim'
		length = blocksPerRound / 2 - 1
		elapsed = offset - blocksPerRound / 2
	}
	const remaining = length - elapsed
	const percent = Math.floor(elapsed*100/length)
	
	let line = `${specificLocalTime(blockTime)} ${roundString(blockNumber)} ${percent}% of ${phase}, ${remaining} blocks left`
	if (blocksPerRound-offset-1 != remaining) line = line + `, ${blocksPerRound-offset-1} in round`
	playersBox.setLine(0, line)
}

async function addPlayer(blockTime, blockNumber, overlay, account, phase, depth, hash)
{
	flushPreviousRound(blockTime, blockNumber)
	//showError(`${roundString(blockNumber)} Player ${leftID(overlay,16)} ${phase} ${depth} ${shortID(hash,16)}`, overlay)
	
	if (phase == 'commit') PlayersCommits++
	else if (phase == 'reveal') PlayersReveals++

	const player = {when: blockTime, overlay: overlay, blockNumber: blockNumber, phase: phase, depth: depth, hash: hash}
	for (var p=0; p<Players.length; p++)
	{
		if (Players[p].overlay == overlay) {
			Players[p] = player
			updatePlayer(p)
			return true
		}
	}
	Players[Players.length] = player
	updatePlayer(Players.length-1)
	updateWinner(blockTime, overlay, account, undefined)	// new players in the round count as playing
	return true
}

let Overlays = []
let Accounts = []

async function associateOverlay(blockTime, overlay, account)
{
	if (isUndefined(Overlays[account])) {
		Overlays[account] = overlay
		Accounts[overlay] = account
		//showError(`New Account ${account} overlay ${leftID(overlay,18)}`)
	}
}



async function handleCommit(blockTime, transaction, receipt, input)
{
	if (input.params.length == 2
	&& input.params[0].name == '_obfuscatedHash'
	&& input.params[1].name == '_overlay'
	&& input.params[0].type == 'bytes32'
	&& input.params[1].type == 'bytes32') {
		associateOverlay(blockTime, input.params[1].value, transaction.from)
		return addPlayer(blockTime, receipt.blockNumber, input.params[1].value, transaction.from, "commit", undefined, undefined)
	}
	return false
}

async function handleReveal(blockTime, transaction, receipt, input)
{
	if (input.params.length == 4
	&& input.params[0].name == '_overlay'
	&& input.params[1].name == '_depth'
	&& input.params[2].name == '_hash'
	&& input.params[3].name == '_revealNonce'
	&& input.params[0].type == 'bytes32'
	&& input.params[1].type == 'uint8'
	&& input.params[2].type == 'bytes32'
	&& input.params[3].type == 'bytes32') {
		const overlay = input.params[0].value
		associateOverlay(blockTime, overlay, transaction.from)
		addHash(receipt.blockNumber, input.params[2].value, input.params[1].value, highlightOverlays.includes(overlay.toLowerCase()))
		return addPlayer(blockTime, receipt.blockNumber, overlay, transaction.from, "reveal", input.params[1].value, input.params[2].value)
	}
	return false
}

async function handleClaim(blockTime, transaction, receipt, input)
{
	if (input.params.length == 0) {
		  if (receipt) {
			const logs = abiDecoder.decodeLogs(receipt.logs)
			if (logs) {
				var truth = undefined
				var depth = undefined
				var value = undefined
				var commits = undefined
				var reveals = undefined
				var freezes = 0
				var slashes = 0
				logs.forEach(log => {
					if (log.name == 'CountCommits') {
						if (log.events.length == 1
						&& log.events[0].name == '_count'
						&& log.events[0].type == 'uint256') {
							const commitCount = log.events[0].value;
							commits = Number(commitCount)
						}
					} else if (log.name == 'CountReveals') {
						if (log.events.length == 1
						&& log.events[0].name == '_count'
						&& log.events[0].type == 'uint256') {
							const revealCount = log.events[0].value;
							reveals = Number(revealCount)
						}
					} else if (log.name == 'TruthSelected') {
						if (log.events.length == 2
						&& log.events[0].name == 'hash'
						&& log.events[1].name == 'depth'
						&& log.events[0].type == 'bytes32'
						&& log.events[1].type == 'uint8') {
							truth = log.events[0].value;
							depth = log.events[1].value
						}
					} else if (log.name == 'StakeFrozen') {
						if (log.events.length == 2
						&& log.events[0].name == 'slashed'
						&& log.events[1].name == 'time'
						&& log.events[0].type == 'bytes32'
						&& log.events[1].type == 'uint256') {
							const overlay = log.events[0].value;
							const time = log.events[1].value
							const account = Accounts[overlay]
							if (!isUndefined(account))
								freezeWinner(blockTime, overlay, account, receipt.blockNumber, time)
							freezes++
						}
					} else if (log.name == 'StakeSlashed') {
						if (log.events.length == 2
						&& log.events[0].name == 'slashed'
						&& log.events[1].name == 'amount'
						&& log.events[0].type == 'bytes32'
						&& log.events[1].type == 'uint256') {
							const overlay = log.events[0].value;
							var amount = log.events[1].value
							const account = Accounts[overlay]
							if (!isUndefined(account)) {
								if (typeof(amount) == 'string') amount = Number(amount)
								updateWinner(blockTime, overlay, account, -amount)
							}
							slashes++
						}
					} else if (log.name == 'WinnerSelected') {
					} else if (log.name == 'Transfer') {
						if (log.events.length == 3
						&& log.events[0].name == 'from'
						&& log.events[1].name == 'to'
						&& log.events[2].name == 'value'
						&& log.events[0].type == 'address'
						&& log.events[1].type == 'address'
						&& log.events[2].type == 'uint256') {
							value = log.events[2].value
						}
					}
					//showError(log)
					//log.events.forEach(event => {
					//	console.log(event)
					//});
				});
				if (value && reveals && commits && depth && truth) {
					addRound(receipt.blockNumber, blockTime, commits, reveals, slashes, Hashes, freezes, truth, depth, value, getAccountOverlay(transaction.from))
					clearHashes()
				}

				if (!isUndefined(value)) {
					updateWinner(blockTime, getAccountOverlay(transaction.from), transaction.from, value)
				}
				if (truth && depth) {
					return addPlayer(blockTime, receipt.blockNumber, getAccountOverlay(transaction.from), transaction.from, "{green-fg}claim{/green-fg}", depth, truth)
				}
			}
		  }
	}
	return false
}


async function updateBlockTransactions(blockNumber, blockTime)
{
  var block = await web3.eth.getBlock(blockNumber)
  if (block.transactions && block.transactions.length > 0) {
    block.transactions.forEach(async tx => {
      var transaction = await web3.eth.getTransaction(tx)
	  
	  var handled = true	// Presume handled to keep it quiet
	  
	  if (transaction.from && monitorAddresses.includes(transaction.from.toLowerCase())) {
		handled = false
	  }

	  if (transaction.to) {
		if (transaction.to.toLowerCase() == redistributionContract.toLowerCase()) {
		  const input = abiDecoder.decodeMethod(transaction.input)
		  if (input.name == 'commit') {
			  var receipt = await web3.eth.getTransactionReceipt(tx)
			  if (!receipt || !receipt.status) return
			  handled = await handleCommit(blockTime, transaction, receipt, input)
		  } else if (input.name == 'reveal') {
			  var receipt = await web3.eth.getTransactionReceipt(tx)
			  if (!receipt || !receipt.status) return
			  handled = await handleReveal(blockTime, transaction, receipt, input)
		  } else if (input.name == 'claim') {
			  var receipt = await web3.eth.getTransactionReceipt(tx)
			  if (!receipt || !receipt.status) return
  			  handled = await handleClaim(blockTime, transaction, receipt, input)
		  }
		} else if (transaction.to.toLowerCase() == stakeRegistryContract.toLowerCase()) {
		  const input = abiDecoder.decodeMethod(transaction.input)
		  handled = false
		} else if (transaction.to.toLowerCase() == gBZZTokenContract.toLowerCase()) {
		  const input = abiDecoder.decodeMethod(transaction.input)
		  handled = false
		} else if (monitorAddresses.includes(transaction.to.toLowerCase())) {
		  handled = false
		}
	  }
	  
	  if (!handled) {
		var receipt = await web3.eth.getTransactionReceipt(tx)
		if (!receipt || !receipt.status) return
		const input = abiDecoder.decodeMethod(transaction.input)
		if (!input || !input.name) {
			if (Number(transaction.value) == 0)
				showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} {red-fg}CANCEL{/red-fg} transaction (0gETH)`, undefined, blockTime)
			else showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} -> ${formatAccountPlusOverlay(transaction.to,12)} ${shortETH(Number(transaction.value))}`, undefined, blockTime)
		} else {
			if (transaction.to.toLowerCase() == stakeRegistryContract.toLowerCase()
			&& input.name == "depositStake"
			&& input.params.length == 3
			&& input.params[0].name == '_owner'
			&& input.params[1].name == 'nonce'
			&& input.params[2].name == 'amount'
			&& input.params[0].type == 'address'
			&& input.params[1].type == 'bytes32'
			&& input.params[2].type == 'uint256') {
			showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} ${input.name}(${formatAccountPlusOverlay(input.params[0].value,12)},${wholeBZZ(input.params[2].value)})`, undefined, blockTime)
			}
			else if (transaction.to.toLowerCase() == gBZZTokenContract.toLowerCase()
			&& input.name == "approve"
			&& input.params.length == 2
			&& input.params[0].name == 'spender'
			&& input.params[1].name == 'amount'
			&& input.params[0].type == 'address'
			&& input.params[1].type == 'uint256') {
			showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} ${input.name}(${formatAccountPlusOverlay(input.params[0].value,12)},${wholeBZZ(input.params[1].value)})`, undefined, blockTime)
			}
			else if (transaction.to.toLowerCase() == gBZZTokenContract.toLowerCase()
			&& input.name == "transfer"
			&& input.params.length == 2
			&& input.params[0].name == 'recipient'
			&& input.params[1].name == 'amount'
			&& input.params[0].type == 'address'
			&& input.params[1].type == 'uint256') {
			showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} ${input.name}(${formatAccountPlusOverlay(input.params[0].value,12)},${wholeBZZ(input.params[1].value)})`, undefined, blockTime)
			}
			else {
			var args = ''
			input.params.forEach(param => {
				if (args != '') args = args + ','
				if (param.type == 'address')
					args = args + `${param.name}: ${formatAccountPlusOverlay(param.value)}`
				else args = args + `${param.name}: ${param.value}`
			});
			if (args.length > 32) args = '***'
			showLogError(`${roundString(blockNumber)} Block: ${blockNumber} ${formatAccountPlusOverlay(transaction.from,12)} -> ${formatAccountPlusOverlay(transaction.to,12)} ${input.name}(${args})`, undefined, blockTime)
			}
		}
		if (false) {
		  showLog('******** RECEIVED TRANSACTION ********');
          showLog(transaction)
		  if (receipt) showLog(receipt)
		  if (input) showLog(input)
		  if (receipt) {
			const logs = abiDecoder.decodeLogs(receipt.logs)
			if (logs) {
				logs.forEach(log => {
					showLog(log)
					//log.events.forEach(event => {
					//	console.log(event)
					//});
				});
			}
		  }
          showLog('*********** END TRANSACTION ***********');
		}
	  }
    });
  }
}



const Web3 = require('web3');
const abiDecoder = require('abi-decoder');
require('dotenv').config();
var fs = require('fs');
console.log(rpcURL);


//const web3 = new Web3(rpcURL)
//Frame size of 5416344 bytes exceeds maximum accepted frame size

var web3 = new Web3(new Web3.providers.WebsocketProvider(rpcURL,
{
clientConfig:{
maxReceivedFrameSize: 10000000000,
maxReceivedMessageSize: 10000000000,
} 
}));
var BN = web3.utils.BN;	// Big number support for gas pricing



var lastBlockTime = 0


var priceHistory = ''
var priceHistoryCount = 0
var lastPrice = new BN(0)
var lastBlockPrice = new BN(0)
var oneGwei = new BN('1000000000')
var oneMwei = new BN('1000000')
var oneKwei = new BN('1000')

async function updateGasPricing(price)
{
	var units = 'gwei'
	if (price.cmp(oneKwei) < 0) // Less than 1 kwei, switch to wei
		units = 'wei'
	else if (price.cmp(oneMwei) < 0) // Less than 1 mwei, switch to kwei
		units = 'kwei'
	else if (price.cmp(oneGwei) < 0)	// Less than 1 gwei, switch to mwei
		units = 'mwei'
	var gwei = web3.utils.fromWei(price, units)

	const dot = gwei.indexOf('.')
	if (dot > 0) {
		if (dot < 3)
			gwei = gwei.slice(0,4)
		else gwei = gwei.slice(0,dot)
	}
		
	var text = `{center}Gas Price: ${gwei} ${units}{/center}`
	winnersBox.insertLine(Winners.length+4 , text);
	screen.render()
}

async function updateGasHistory(price)
{
	const cmp = price.cmp(lastPrice)
	const delta = price.sub(lastPrice)
	const p10 = lastPrice.divn(10)
	const bigChange = (delta.abs().cmp(p10) > 0)

	if (!lastPrice.isZero()) {
		if (bigChange) {
			if (cmp < 0) priceHistory = priceHistory + '{green-fg}v{/green-fg}'
			if (cmp == 0) priceHistory = priceHistory + '{yellow-fg}-{/yellow-fg}'
			if (cmp > 0) priceHistory = priceHistory + '{red-fg}^{/red-fg}'
		} else {
			if (cmp < 0) priceHistory = priceHistory + 'v'
			if (cmp == 0) priceHistory = priceHistory + '-'
			if (cmp > 0) priceHistory = priceHistory + '^'
		}
		priceHistoryCount++
		if (priceHistoryCount > 34) {
			if (priceHistory[0] == '{') {
				for (var i=0; i<2; i++) {
					const curly = priceHistory.indexOf('}')
					priceHistory = priceHistory.slice(curly+1)
				}
			} else priceHistory = priceHistory.slice(1)
			priceHistoryCount--
		}
	}
	lastPrice = price
	//if (priceHistory.length > 36) priceHistory = priceHistory.slice(1)

	blocksBox.setLine(0 , `{center}${priceHistory}{/center}`);
}

async function updateBlockHeader(blockHeader)
{
	const blockTime = new Date(blockHeader.timestamp*1000)
	const dt = blockTime.toISOString()
	var gas = ''
	var gasPercent = ''
	if (blockHeader.gasLimit > 0) {
		gasPercent = `${Math.floor(blockHeader.gasUsed*1000/blockHeader.gasLimit)/10.0}%`
	} else gasPercent = `${blockHeader.gasUsed}/${blockHeader.gasLimit}`
	if (blockHeader.baseFeePerGas) {
		const price = new BN(blockHeader.baseFeePerGas)
		updateGasHistory(price)

		var units = 'gwei'
		if (price.cmp(oneKwei) < 0) // Less than 1 kwei, switch to wei
			units = 'wei'
		else if (price.cmp(oneMwei) < 0) // Less than 1 mwei, switch to kwei
			units = 'kwei'
		else if (price.cmp(oneGwei) < 0)	// Less than 1 gwei, switch to mwei
			units = 'mwei'
		var gwei = web3.utils.fromWei(price, units)

		const dot = gwei.indexOf('.')
		if (dot > 0) {
			if (dot < 3)
				gwei = gwei.slice(0,4)
			else gwei = gwei.slice(0,dot)
		}
		
		const cmp = price.cmp(lastBlockPrice)
		const delta = price.sub(lastBlockPrice)
		var percent
		if (!lastBlockPrice.isZero()) {
			const deltaBoost = delta.muln(100)
			percent = deltaBoost.div(lastBlockPrice)
		} else percent = new BN(0)
		const p10 = lastBlockPrice.divn(10)
		//delta.iabs()
		const bigChange = (delta.abs().cmp(p10) > 0)
		if (bigChange) {
			if (cmp < 0) percent = `{green-fg}${percent}%{/green-fg}`
			else if (cmp > 0) percent = `{red-fg}${percent}%{/red-fg}`
			else percent `{yellow-fg}${percent}%{/yellow-fg}`
		} else percent = `${percent}%`
		//showError(`${cmp} ${lastBlockPrice}->${price} ${delta} ${delta.abs()} > ${p10} ${bigChange} ${percent}`)
		lastBlockPrice = price
		
		gas = ` ${gwei}${units} ${percent}`
	}
	var text = `${roundString(blockHeader.number)} Block: ${blockHeader.number} Gas: ${gasPercent}${gas} Time: ${dt}`;
	var deltaBlockTime = ''
	if (lastBlockTime) {
		const delta = blockHeader.timestamp-lastBlockTime
		deltaBlockTime = ` ${delta}`
		if (delta >= BlockRate*3)
			deltaBlockTime = `{red-fg}${deltaBlockTime}{/red-fg}`
		else if (delta >= BlockRate*2)
			deltaBlockTime = `{yellow-fg}${deltaBlockTime}{/yellow-fg}`
		else if (delta < BlockRate)
			deltaBlockTime = `{green-fg}${deltaBlockTime}{/green-fg}`
		deltaBlockTime = `${deltaBlockTime}s`
		text = text + deltaBlockTime
	}
	if (blocksBox) blocksBox.insertLine(1,`${specificLocalTime(blockTime)} ${blockHeader.number}${deltaBlockTime}${gas}`)
	lastBlockTime = blockHeader.timestamp
	updatePlayerRound(blockTime, blockHeader.number)
	showError(text, "block");
	const start = Date.now()
	await updateBlockTransactions(blockHeader.number, blockTime)
	const elapsed = Date.now() - start
	text = text + ` ${elapsed}ms`
	//if (blocksBox) blocksBox.setLine(1,`${specificLocalTime(blockTime)} ${blockHeader.number}${deltaBlockTime}${gas}${elapsed}ms`)
	showError(text, "block");
}



async function subscribeAll()
{
abiDecoder.addABI(RedistributionABI)
abiDecoder.addABI(StakeRegistryABI)
abiDecoder.addABI(gBZZTokenABI)

	var currentBlockNumber = await web3.eth.getBlockNumber()
	if (startingBlockNumber == 0) {
		startingBlockNumber = currentBlockNumber	// Default to just start in the present moment
		startingBlockNumber -= blocksPerRound * preloadRounds	// But back off a few rounds if specified
	}
	startingBlockNumber = Math.floor(startingBlockNumber/blocksPerRound)*blocksPerRound		// Start at the first block of the round
	do
	{
		currentBlockNumber = await web3.eth.getBlockNumber()
		showError(`Replaying blocks ${startingBlockNumber} to ${currentBlockNumber}`)
		for (var n = startingBlockNumber; n <= currentBlockNumber; n++)
		{
			var block = await web3.eth.getBlock(n)
			await updateBlockHeader(block)
		}
		startingBlockNumber = currentBlockNumber + 1
	} while (currentBlockNumber != await web3.eth.getBlockNumber())

	let lastBlockNumber = currentBlockNumber

if (false) {
const options = {address: redistributionContract};	// Redistribution Contract
web3.eth.subscribe('logs', options, function(error, result){ 
  if (error) console.error(error);
}).on("data", function(log){
  const decodedLogs = abiDecoder.decodeLogs([log]);
  showLog('******** Redistribution RECEIVED EVENT ********');
  //console.log(decodedLogs)
  decodedLogs.forEach(log => {
	showLog(log)
	//log.events.forEach(event => {
	//	console.log(event)
    //});
  });
  showLog('*********** END Redistribution EVENT ***********');
});
}



if (true) {
const options2 = {address: stakeRegistryContract};	// StakeRegistry contract
web3.eth.subscribe('logs', options2, function(error, result){ 
  if (error) console.error(error);
}).on("data", function(log){
  const decodedLogs = abiDecoder.decodeLogs([log]);
  if (decodedLogs
  && decodedLogs.length == 1
  && decodedLogs[0].name == "StakeFrozen"
  && decodedLogs[0].events.length == 2
  && decodedLogs[0].events[0].name == "slashed"
  && decodedLogs[0].events[1].name == "time"
  && decodedLogs[0].events[0].type == "bytes32"
  && decodedLogs[0].events[1].type == "uint256") {
		showLogError(`${formatOverlay(decodedLogs[0].events[0].value,12)} {cyan-fg}FROZEN{/cyan-fg} for ${decodedLogs[0].events[1].value} blocks`)
  }
  else if (decodedLogs
  && decodedLogs.length == 1
  && decodedLogs[0].name == "StakeSlashed"
  && decodedLogs[0].events.length == 2
  && decodedLogs[0].events[0].name == "slashed"
  && decodedLogs[0].events[1].name == "amount"
  && decodedLogs[0].events[0].type == "bytes32"
  && decodedLogs[0].events[1].type == "uint256") {
		showLogError(`${formatOverlay(decodedLogs[0].events[0].value,12)} {red-fg}SLASHED{/red-fg} ${wholeBZZ(decodedLogs[0].events[1].value)}`)
  }
  else if (decodedLogs
  && decodedLogs.length == 1
  && decodedLogs[0].name == "StakeUpdated"
  && decodedLogs[0].events.length == 4
  && decodedLogs[0].events[0].name == "overlay"
  && decodedLogs[0].events[1].name == "stakeAmount"
  && decodedLogs[0].events[2].name == "owner"
  && decodedLogs[0].events[3].name == "lastUpdatedBlock"
  && decodedLogs[0].events[0].type == "bytes32"
  && decodedLogs[0].events[1].type == "uint256"
  && decodedLogs[0].events[2].type == "address"
  && decodedLogs[0].events[3].type == "uint256") {
		showLogError(`${formatOverlay(decodedLogs[0].events[0].value,12)} StakeUpdated ${wholeBZZ(decodedLogs[0].events[1].value)}`)
  }
  else {
  showLog('******** StakeRegistry RECEIVED EVENT ********');
  //console.log(decodedLogs)
  decodedLogs.forEach(log => {
	showLog(log)
	//log.events.forEach(event => {
	//	console.log(event)
    //});
  });
  showLog('*********** END StakeRegistry EVENT ***********');
  }
});
}



if (true) {
const options3 = {address: gBZZTokenContract};	// gBZZ token contract
web3.eth.subscribe('logs', options3, function(error, result){ 
  if (error) console.error(error);
}).on("data", function(log){
  const decodedLogs = abiDecoder.decodeLogs([log]);
  if (decodedLogs
  && decodedLogs.length == 1
  && decodedLogs[0].name == "Transfer"
  && decodedLogs[0].events.length == 3
  && decodedLogs[0].events[0].name == "from"
  && decodedLogs[0].events[1].name == "to"
  && decodedLogs[0].events[2].name == "value"
  && decodedLogs[0].events[0].type == "address"
  && decodedLogs[0].events[1].type == "address"
  && decodedLogs[0].events[2].type == "uint256") {
		var bzz = wholeBZZ(decodedLogs[0].events[2].value)
		showLogError(`${bzz} gBZZ from ${formatAccountPlusOverlay(decodedLogs[0].events[0].value,12)} to ${formatAccountPlusOverlay(decodedLogs[0].events[1].value,12)}`)
  }
  else if (decodedLogs
  && decodedLogs.length == 1
  && decodedLogs[0].name == "Approval"
  && decodedLogs[0].events.length == 3
  && decodedLogs[0].events[0].name == "owner"
  && decodedLogs[0].events[1].name == "spender"
  && decodedLogs[0].events[2].name == "value"
  && decodedLogs[0].events[0].type == "address"
  && decodedLogs[0].events[1].type == "address"
  && decodedLogs[0].events[2].type == "uint256") {
		var bzz = wholeBZZ(decodedLogs[0].events[2].value)
		showLogError(`${bzz} gBZZ Approved from ${formatAccountPlusOverlay(decodedLogs[0].events[0].value,12)} to ${formatAccountPlusOverlay(decodedLogs[0].events[1].value,12)}`)
  }
  else {
  showLog('******** gBZZ Token RECEIVED EVENT ********');
  //console.log(decodedLogs)
  decodedLogs.forEach(log => {
	showLog(log)
	//log.events.forEach(event => {
	//	console.log(event)
    //});
  });
  showLog('*********** END gBZZ Token EVENT ***********');
  }
});
}

let blockSubscription = web3.eth.subscribe('newBlockHeaders')
blockSubscription.subscribe((error, result) => {
	if (error) {
		console.error("Error subscribing to event", error)
		process.exit()
	}
}).on('data', async blockHeader => {
	if (!blockHeader || !blockHeader.number) return
	if (blockHeader.number == lastBlockNumber) return
	lastBlockNumber = blockHeader.number
	updateBlockHeader(blockHeader)
	updateGasPricing(new BN(await web3.eth.getGasPrice()))
})

}

function chainName(id)
{
	switch (id) {
	// from https://besu.hyperledger.org/en/stable/public-networks/concepts/network-and-chain-id/
	case 1: return 'mainnet'; break;
	case 5: return 'goerli'; break;
	case 11155111: return 'sepolia'; break;
	case 2018: return 'dev'; break;
	case 61: return 'classic'; break;
	case 63: return 'ordor'; break;
	case 6: return 'kotti'; break;
	case 212: return 'astor'; break;
	// from https://metamask.zendesk.com/hc/en-us/articles/360052711572-How-to-connect-to-the-Gnosis-Chain-network-formerly-xDai-
	case 100: return 'gnosis'; break;
	default:
		return `chain ${id}`
	}
}

async function showNetwork()
{
	const chainID = await web3.eth.getChainId()
	const nodeInfo = await web3.eth.getNodeInfo()
	const nodeParts = nodeInfo.split('/')
	var provider = nodeParts[0]
	if (nodeParts.length > 1) provider = `${nodeParts[0]} ${nodeParts[1]}`
	winnersBox.insertLine(1,`{center}${chainName(chainID)}{/center}\n{center}${provider}{/center}`)
	screen.render()
}

async function start()
{
	await addBoxes()

	await showNetwork()

	await highlightOverlays.forEach(overlay => updateWinner(undefined, overlay, undefined, undefined))	// Prime the highlighted overlays

	await screen.render()

	await subscribeAll()
}
start()
