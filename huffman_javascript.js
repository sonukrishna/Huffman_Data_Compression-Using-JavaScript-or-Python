// huffman data compression using JavaScript
codes = {}
function rel_freq(str){
    var freqs = {}
    for (var i = 0; i < (str.length); i++ ){
        if (freqs[str[i]] == undefined)
	    freqs[str[i]] = 1;
	else
	    freqs[str[i]] = freqs[str[i]] + 1;
       
    }
    return freqs;
}

function sort_freq(freqs){
    var letters = Object.keys(freqs)
    var tuples= []
    for (i = 0; i < letters.length; i++){
	tuples[i] = [freqs[letters[i]], letters[i]];
    }
    tuples.sort()
    return tuples
}

function build_tree(tuples){
    while(tuples.length > 1){
	var least_two = [tuples[0][1], tuples[1][1]];
	var the_rest = tuples.slice(2,tuples.length);
	var comb_freq = least_two[0][0] +least_two[0][1];
	tuples = the_rest;
        the_first = [comb_freq, least_two];
	tuples.push(the_first);
	tuples.sort();
    }
    return tuples;
}

function trim_tree(tree){
    return tree[0][1];
}
function assign_codes(node,pat){
    codes;
    if (pat==undefined)
        pat='';
    if (typeof(node)==typeof(''))
	codes[node] = pat;
    else{
	assign_codes(node[0], pat+'0');
	assign_codes(node[1], pat+'1');
    }  
    return codes;
} 
function encode(str){
    var output = '';
    for (var ch in str){
	output += codes[str[ch]];
    }
    return output;
}
function decode(tree, str){
    var output = "";
    p = tree
    for (var bit in str){
	if (str[bit] == '0'){
	    p = p[0]
	}
	else{
	    p = p[1]
	}
	if (typeof(p) == typeof('')){
	    output += p
	    p = tree
	}   
    }
    return output
}
str = 'aaabbcccddbbbdhjhejjk'
freqs = rel_freq(str);
console.log('frequency', freqs)

sorts = sort_freq(freqs);
console.log('sorted frequency \n', sorts)

tree = build_tree(sorts);
console.log('the tree created', tree)

trim = trim_tree(tree);
console.log('the trimmed tree ',trim)

assign = assign_codes(trim);
console.log('assign codes are\n', assign)

encoded = encode(str);
console.log = ('the compressed text\n', encoded)

decoded = decode(trim, encoded);
console.log('the decoded output is \n', decoded)

