# Find more example scripts at https://github.com/PortSwigger/turbo-intruder/blob/master/resources/examples/default.py
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=3, requestsPerConnection=5, pipeline=False)

    special_chars = ["\"", "\'", "<", ">", ".", "*", "_", "^", ",", "?", "\\", "/", ":", ";", "%", "{", "[", "+", "-", "@", "!",
                      "(", ")", "|", "`", "   ", "#", "$", "[%24ne]", "[]", "{'&ne':'2'}", "{}", "=", chr(0), chr(1), chr(2), chr(3), chr(10), chr(13), chr(13)+chr(10)]

    url_encoded_special_chars = []

    def encode_url(string):
        return "".join("%{0:0>2}".format(format(ord(char), "x")) for char in string)

    for s in special_chars:
        url_encoded_special_chars.append(encode_url(s))
    print(url_encoded_special_chars)

    def replace_chars_in_order(target_string):
        mutation = list()
        for char in special_chars:
            for i in range(0, len(target_string) + 1):
                mutation.append(target_string[:i] + char + target_string[i:])
        return mutation

    # def test_url_delimeters(target_string):
    #     mutation = list()
    #     for char in special_chars:
    #         for i in range(0, len(target_string) + 1):
    #             mutation.append(target_string[:i] + char + target_string[i:])
    #
    # def test_url_encoding(target_string):
    #     mutation = list()
    #     for char in special_chars:
    #         for i in range(0, len(target_string) + 1):
    #             mutation.append(target_string[:i] + char + target_string[i:])
    #     return mutation

    def replace_chars_with_two_chars(target_string):
        mutation = list()
        for char in special_chars:
            for i in range(0, len(target_string) + 1):
                for special_char in special_chars:
                    mutation.append(target_string[:i] + char + target_string[i:] + special_char)
        return mutation

    def plexer(target_string):
        test1 = replace_chars_in_order(target_string)
        for word in test1:
            engine.queue(target.req, word.rstrip())
        test2 = replace_chars_with_two_chars(target_string)
        for word in test2:
            engine.queue(target.req, word.rstrip())
        #results = dict()
        # with open("C:\\Users\\Admin\\Desktop\\report" + str(datetime.datetime.now()) + ".txt", "w") as fp:
        #     for p in results.items():
        #         fp.writeline(p)

    plexer("Moscow")


def handleResponse(req, interesting):
    table.add(req)
    if target.req.label not in results.keys():
        results[target.req.response] = [target.req.label]
    else:
        results[target.req.response].append(target.req.label)

