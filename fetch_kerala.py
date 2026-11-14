import json,time,math,re,urllib.request,urllib.parse
EP='https://query.wikidata.org/sparql'
HDR={'User-Agent':'PixlotorKeralaPack/1.0 (hobby site)','Accept':'application/sparql-results+json'}
CAP=10000
MALE='http://www.wikidata.org/entity/Q6581097'
def run(lo,hi,lim,off):
    q='''SELECT ?p ?name ?sl ?born ?died ?g (GROUP_CONCAT(DISTINCT ?ol;separator="|") AS ?occ) WHERE {
?p wdt:P31 wd:Q5; wdt:P19/wdt:P131* wd:Q1186; wikibase:sitelinks ?sl.
FILTER(?sl>=%d && ?sl<=%d)
?p rdfs:label ?name. FILTER(LANG(?name)="en")
OPTIONAL{?p wdt:P21 ?g}
OPTIONAL{?p wdt:P569 ?born}
OPTIONAL{?p wdt:P570 ?died}
OPTIONAL{?p wdt:P106 ?o. ?o rdfs:label ?ol. FILTER(LANG(?ol)="en")}
} GROUP BY ?p ?name ?sl ?born ?died ?g ORDER BY DESC(?sl) ?p LIMIT %d OFFSET %d''' % (lo,hi,lim,off)
    url=EP+'?format=json&query='+urllib.parse.quote(q)
    for t in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers=HDR),timeout=75) as r:
                return json.load(r)['results']['bindings']
        except Exception as e:
            print('  retry',t+1,str(e)[:70]);time.sleep(6*(t+1))
    return None
def has(o,words):
    return any(w in o for w in words)
def traits(r):
    o=r.get('occ',{}).get('value','').lower()
    t=['real','ind','ker']
    if r.get('g',{}).get('value','')==MALE:t.append('male')
    if r.get('died'):t.append('dead')
    try:
        y=int(r['born']['value'][:4])
        t.append('e1' if y<1950 else 'e2' if y<1980 else 'e3' if y<2000 else 'e4')
    except Exception:pass
    if has(o,['actor','actress']):t.append('act')
    if has(o,['film director']):t.append('dir')
    if has(o,['politician']):t.append('pol')
    if has(o,['cricketer']):t.append('cr')
    if has(o,['football']):t.append('fb')
    if has(o,['singer']):t.append('sing')
    if has(o,['writer','novelist','poet','author','screenwriter']):t.append('wr')
    if has(o,['journalist']):t.append('jr')
    if has(o,['scientist','physicist','chemist','mathematician','biologist','astronom','engineer','inventor']):t.append('sci')
    if has(o,['businessperson','entrepreneur','businessman']):t.append('bus')
    if has(o,['composer','musician','guitarist','violinist','lyricist','drummer']):t.append('mus')
    if has(o,['athlete','sprinter','swimmer','hockey','badminton','volleyball','basketball','tennis','boxer','wrestler','kabaddi','long jumper','runner']):t.append('oth')
    return ' '.join(t)
out=[];seen=set()
for lo,hi in [(40,9999),(20,39),(12,19),(8,11),(6,7),(5,5),(4,4),(3,3),(2,2),(1,1)]:
    if len(out)>=CAP:break
    off=0
    while len(out)<CAP:
        rows=run(lo,hi,1500,off)
        if rows is None:print('  skipped a page');break
        for r in rows:
            q=r['p']['value'].rsplit('/',1)[1]
            nm=r['name']['value'].strip()
            if q in seen or not re.search('[A-Za-z]',nm):continue
            seen.add(q)
            out.append([nm,traits(r),round(math.log(int(r['sl']['value'])+1),2)])
        print('sitelinks',lo,'-',hi,'offset',off,'total',len(out))
        if len(rows)<1500:break
        off+=1500;time.sleep(2)
out=out[:CAP]
json.dump(out,open('kerala.json','w'),ensure_ascii=False,separators=(',',':'))
print('DONE. Saved',len(out),'people to kerala.json')
