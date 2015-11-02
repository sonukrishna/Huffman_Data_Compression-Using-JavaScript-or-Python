"""the relative freq of letters in a word"""
import sys
codes ={}
def rel_freq(word):
    freqs = {}
    for i in word:
        freqs[i] = freqs.get(i, 0) + 1
    return freqs

"""sort the relative frequencies """
def sort_freq(rel_freq):
    letters = rel_freq.keys()
    res = []
    for i in letters:
        res.append((rel_freq[i], i))
    res.sort()
    return res
def build_tree(sort_freq):
    while len(sort_freq) > 1:
        least_two = tuple(sort_freq[0:2])
        the_rest = sort_freq[2:]
        comb_freq = least_two[0][0] + least_two[1][0]
        sort_freq = the_rest + [(comb_freq, least_two)]
        sort_freq.sort()
    return sort_freq[0]
def trim_freq(tree):
    """trim the freq """
    p = tree[1]
    if type(p) == type(""):
        return p
    else:
        return (trim_freq(p[0]), trim_freq(p[1]))
    
def assign_codes(node, pat=''):
    global codes
    if type(node) == type(''):
        codes[node] = pat
    else:
        assign_codes(node[0], pat + "0")
        assign_codes(node[1], pat + "1")

def encode(word):
    global codes
    res = ""
    for i in word:
        res += codes[i]
    return res

def decode(tree, word):
    res1 = ""
    n = tree
    for i in word:
        if i == '0':
            n = n[0] #head upto left
        else:
            n = n[1] #head upto right
        if type(n) == type(''):
            res1 += n  #find a character add to result
            n = tree  #restart for the next character
#            print res1
    return res1

word = 'when i was a child, i dreamt as sakthiman '
freq = rel_freq(word)
print freq
srtd = sort_freq(freq)
print srtd
tree = build_tree(srtd)
print tree
trim = trim_freq(tree)
#print c
#print e
assign = assign_codes(trim, pat='')
#print codes
print encode(word)
small = encode(word)
original =  decode(trim, small)
bytes1 = int(len(small)/8)
print bytes1
print "Original text length ",len(word)
print "Requires %d bits. " %(len(small))
print "Restored matches original ",word == original
lst = []
for i in word:
    if i not in lst:
        lst.append(i)
for j in lst:
    print "Code for %s is %s "%(j, codes[j])
#print "Code for letter a  is ",codes['a']
#print "Code for letter i is ",codes['i']
