PGDMP     (         
            {            postgres    15.2    15.2 N               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3458                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    24696 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.categories;
       public         heap    postgres    false    5            �            1259    24695    categories_id_seq    SEQUENCE     �   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220    5            �            1259    24806    cities    TABLE     �   CREATE TABLE public.cities (
    id integer NOT NULL,
    picture character varying(255),
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.cities;
       public         heap    postgres    false    5            �            1259    24805    cities_id_seq    SEQUENCE     �   ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    242    5            �            1259    24719    eventCategories    TABLE     �   CREATE TABLE public."eventCategories" (
    id integer NOT NULL,
    "eventId" integer,
    "categoryId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 %   DROP TABLE public."eventCategories";
       public         heap    postgres    false    5            �            1259    24718    eventCategories_id_seq    SEQUENCE     �   ALTER TABLE public."eventCategories" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventCategories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224    5            �            1259    24710    events    TABLE     <  CREATE TABLE public.events (
    id integer NOT NULL,
    picture character varying(255),
    tittle character varying(255),
    date date,
    "cityId" integer,
    descriptions text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "createdBy" integer
);
    DROP TABLE public.events;
       public         heap    postgres    false    5            �            1259    24709    events_id_seq    SEQUENCE     �   ALTER TABLE public.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222    5            �            1259    24786    forgotRequest    TABLE     �   CREATE TABLE public."forgotRequest" (
    id integer NOT NULL,
    email character varying(255),
    code character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 #   DROP TABLE public."forgotRequest";
       public         heap    postgres    false    5            �            1259    24785    forgotRequest_id_seq    SEQUENCE     �   ALTER TABLE public."forgotRequest" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forgotRequest_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    240    5            �            1259    24726    patners    TABLE     �   CREATE TABLE public.patners (
    id integer NOT NULL,
    picture character varying(255),
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.patners;
       public         heap    postgres    false    5            �            1259    24725    patners_id_seq    SEQUENCE     �   ALTER TABLE public.patners ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    5            �            1259    24751    paymentMethod    TABLE     �   CREATE TABLE public."paymentMethod" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 #   DROP TABLE public."paymentMethod";
       public         heap    postgres    false    5            �            1259    24750    paymentMethod_id_seq    SEQUENCE     �   ALTER TABLE public."paymentMethod" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethod_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232    5            �            1259    24687    profile    TABLE     �  CREATE TABLE public.profile (
    id integer NOT NULL,
    picture character varying(255),
    "fullName" character varying(255),
    "phoneNumber" character varying(255),
    gender character varying(25),
    profession character varying(255),
    "Nationality" character varying(255),
    "birthDate" date,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "userId" integer
);
    DROP TABLE public.profile;
       public         heap    postgres    false    5            �            1259    24686    profile_id_seq    SEQUENCE     �   ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    5            �            1259    24758    reservation    TABLE     	  CREATE TABLE public.reservation (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    "statusId" integer,
    "paymentMethodId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.reservation;
       public         heap    postgres    false    5            �            1259    24735    reservationSections    TABLE     �   CREATE TABLE public."reservationSections" (
    id integer NOT NULL,
    name character varying(255),
    price character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 )   DROP TABLE public."reservationSections";
       public         heap    postgres    false    5            �            1259    24734    reservationSections_id_seq    SEQUENCE     �   ALTER TABLE public."reservationSections" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationSections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228    5            �            1259    24744    reservationStatus    TABLE     �   CREATE TABLE public."reservationStatus" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 '   DROP TABLE public."reservationStatus";
       public         heap    postgres    false    5            �            1259    24743    reservationStatus_id_seq    SEQUENCE     �   ALTER TABLE public."reservationStatus" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationStatus_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230    5            �            1259    24765    reservationTickets    TABLE     �   CREATE TABLE public."reservationTickets" (
    id integer NOT NULL,
    "reservationId" integer,
    "sectionId" integer,
    quantity integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 (   DROP TABLE public."reservationTickets";
       public         heap    postgres    false    5            �            1259    24764    reservationTickets_id_seq    SEQUENCE     �   ALTER TABLE public."reservationTickets" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationTickets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    236    5            �            1259    24757    reservation_id_seq    SEQUENCE     �   ALTER TABLE public.reservation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    234            �            1259    24676    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    24675    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216    5            �            1259    24772    wishList    TABLE     �   CREATE TABLE public."wishList" (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public."wishList";
       public         heap    postgres    false    5            �            1259    24771    wishList_id_seq    SEQUENCE     �   ALTER TABLE public."wishList" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."wishList_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    238            f          0    24696 
   categories 
   TABLE DATA           H   COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �\       |          0    24806    cities 
   TABLE DATA           M   COPY public.cities (id, picture, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   E]       j          0    24719    eventCategories 
   TABLE DATA           b   COPY public."eventCategories" (id, "eventId", "categoryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   �]       h          0    24710    events 
   TABLE DATA           z   COPY public.events (id, picture, tittle, date, "cityId", descriptions, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    222   T^       z          0    24786    forgotRequest 
   TABLE DATA           T   COPY public."forgotRequest" (id, email, code, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   �`       l          0    24726    patners 
   TABLE DATA           N   COPY public.patners (id, picture, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   /a       r          0    24751    paymentMethod 
   TABLE DATA           M   COPY public."paymentMethod" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   �a       d          0    24687    profile 
   TABLE DATA           �   COPY public.profile (id, picture, "fullName", "phoneNumber", gender, profession, "Nationality", "birthDate", "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    218   :b       t          0    24758    reservation 
   TABLE DATA           w   COPY public.reservation (id, "eventId", "userId", "statusId", "paymentMethodId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   �c       n          0    24735    reservationSections 
   TABLE DATA           Z   COPY public."reservationSections" (id, name, price, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   ]e       p          0    24744    reservationStatus 
   TABLE DATA           Q   COPY public."reservationStatus" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   �e       v          0    24765    reservationTickets 
   TABLE DATA           t   COPY public."reservationTickets" (id, "reservationId", "sectionId", quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   ,f       b          0    24676    users 
   TABLE DATA           X   COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �g       x          0    24772    wishList 
   TABLE DATA           W   COPY public."wishList" (id, "eventId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    238   Zj       �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 7, true);
          public          postgres    false    219            �           0    0    cities_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cities_id_seq', 8, true);
          public          postgres    false    241            �           0    0    eventCategories_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."eventCategories_id_seq"', 7, true);
          public          postgres    false    223            �           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 18, true);
          public          postgres    false    221            �           0    0    forgotRequest_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."forgotRequest_id_seq"', 9, true);
          public          postgres    false    239            �           0    0    patners_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.patners_id_seq', 6, true);
          public          postgres    false    225            �           0    0    paymentMethod_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."paymentMethod_id_seq"', 5, true);
          public          postgres    false    231            �           0    0    profile_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.profile_id_seq', 8, true);
          public          postgres    false    217            �           0    0    reservationSections_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."reservationSections_id_seq"', 6, true);
          public          postgres    false    227            �           0    0    reservationStatus_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."reservationStatus_id_seq"', 3, true);
          public          postgres    false    229            �           0    0    reservationTickets_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."reservationTickets_id_seq"', 25, true);
          public          postgres    false    235            �           0    0    reservation_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reservation_id_seq', 29, true);
          public          postgres    false    233            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 32, true);
          public          postgres    false    215            �           0    0    wishList_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."wishList_id_seq"', 5, true);
          public          postgres    false    237            �           2606    24701    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    220            �           2606    24813    cities cities_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_pkey;
       public            postgres    false    242            �           2606    24724 $   eventCategories eventCategories_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."eventCategories"
    ADD CONSTRAINT "eventCategories_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."eventCategories" DROP CONSTRAINT "eventCategories_pkey";
       public            postgres    false    224            �           2606    24717    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    222            �           2606    24793     forgotRequest forgotRequest_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."forgotRequest"
    ADD CONSTRAINT "forgotRequest_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."forgotRequest" DROP CONSTRAINT "forgotRequest_pkey";
       public            postgres    false    240            �           2606    24733    patners patners_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.patners
    ADD CONSTRAINT patners_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.patners DROP CONSTRAINT patners_pkey;
       public            postgres    false    226            �           2606    24756     paymentMethod paymentMethod_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT "paymentMethod_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."paymentMethod" DROP CONSTRAINT "paymentMethod_pkey";
       public            postgres    false    232            �           2606    24694    profile profile_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_pkey;
       public            postgres    false    218            �           2606    24742 ,   reservationSections reservationSections_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."reservationSections"
    ADD CONSTRAINT "reservationSections_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."reservationSections" DROP CONSTRAINT "reservationSections_pkey";
       public            postgres    false    228            �           2606    24749 (   reservationStatus reservationStatus_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."reservationStatus"
    ADD CONSTRAINT "reservationStatus_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."reservationStatus" DROP CONSTRAINT "reservationStatus_pkey";
       public            postgres    false    230            �           2606    24770 *   reservationTickets reservationTickets_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."reservationTickets"
    ADD CONSTRAINT "reservationTickets_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."reservationTickets" DROP CONSTRAINT "reservationTickets_pkey";
       public            postgres    false    236            �           2606    24763    reservation reservation_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public            postgres    false    234            �           2606    24685    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    24683    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    24777    wishList wishList_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."wishList"
    ADD CONSTRAINT "wishList_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."wishList" DROP CONSTRAINT "wishList_pkey";
       public            postgres    false    238            f   s   x�3��--�L�4202�50�54R0��26�20�352310���2�t,*)&�Șӿ�$%?���B�������
M9��J�2�tK-.�,K�!�М�-�8#3?���=... ^z=�      |   �   x��б�0��}
_ �{/mo�ttpa2ai�T�|{I]�~�����"�C.� �����TH��
R;���.�#ړ�M�U�(ʃ��1d$%�� V9�3�ژS�W��t�Ӊ-;ƅuA4�0e�I��Ż��ű	k4����~��:m)����Y�      j   O   x���� !D��P�6�D���4 �ח��OYG��D�#~���sܗ����(�0QnV�g�Ran'�v�.�      h   S  x����n�0������z|�pת��{�V�nz�7q��}�� ��V�HH!����{f��Fh� gi�Xoȍ-]c]������3.���Eҩ�=T��e���>Up���F-YF�΁�L'F '��b2��9������`o\�L�u�t�k�.��9�D�����;�s�����_
�w���m����]q���HN�����kW�`z��j� ���������H"I=��]y�OXZ�*}�Y�Μ1#����6��+�z @Q�¾`��mד�Z��j�G�ӫ�A�鷭�{���&��xl,=_�h_p��>��tL'G�f�8�Dǰ�õ[_ḷ���*%��Ö}K�.�Ǹ���Aў�[�֟�к�^=�p����0��Ǘ��{��ߩ��n�9|�Į��ӢIi��$A�@m.�2�4t\/ �  �K�d2� |&@�D+ex:� g������r����̃�RL 5 s�I&�V@��Cb�Q�Ԃ�'Nk��
�/���_�?i.M"3�T�������/R&R����_6gE�|��+AH� ��������L"�����b�T	��b��250o��b�����      z   h   x�M�1�  ����@��0�_�#28�{�`��ǰ�˽��j�[����V!	FA`do1X�S�����h�R�/���_��c�(��i�%�1�k�      l   k   x��˻	�0 �:����!!�����EI���t���a{����)WX����a  !�L3�LSe%	�������Ŷ�_�,�%�ge[�_�YjK����S��K�Sn      r   �   x�3�t.JM�,QpN,J�4202�50�50V0��22�22�335357���2�tJ��V)J�+NK-"�ژ�7?)3'U�)3/��rNG?G�L9C�RR�2�R��j�``iej Dzf���� �1z\\\ ��2      d   �  x����n�0���S�����	�M7�f�b�KA�r߾�V�4Q��#y�9�!�Ƒ��R[���:��뒙!�	υ l���m�~��ƾ�䴏=C������@��;tT(�L	���F��?0g������V"E�`�c���*�_��G��B���0�չ_S��x��׻�Ac@%JY
m�z��B% 8��u%�!I��u_���[
��Z�n���@_$Hz�lH䵤���4�����V��ِđ]_^�=tݖv�8-Gs����2w�u��k�m�8�C�uZ���*�( ���楋ۭ{���@�5�[ssޛEh��ō9~=!6�"#@�W��1ܱ�Җ,"���cZ�?<T��g��9=�y|>S�����d ����z���7it��      t   �  x�}�Qn1D�7��1`0�!z����l���8�~D�cf�v��C�v�>�=�O��>�(�@;����X�x��d��i:����{��k}7�'�lIwB�}�q���/p,��\�C8v`�+�GS,�ۄ������$x2&�+P>�6�o\��n�6E�[�ȶ/�8z\��	Lf���:�)Lڙ��D�@��H��z��"u��(�ˤ�-�-u�v���>��� ��En����ե\�mD���^�!ۈ�4'(ԣ�mF�ӄ }H�.���B�U.?e�Qڞ�J�"�V�&#T3:E#ʥ4)�_V�]`�S2���u�Z.�����\���j���_.�*��
}@Z��B������36�>������qr�9�F�#��oz<?	���      n   f   x�3�JM/�I-�5�44 N##c]S]c+C �ʘ�Zr��q��q�Vo�� 4ۈ�M�j�8��0ה3b�1�Aqar� /&7$      p   I   x�3�,H�K��K�4202�50�50V00�2��25�3333�0���2�,H�L!�Ș391/95''���=... ��K      v   _  x�}�ۍ�0�o�
7���TSA��c(yl���2�K��6�hh҄E�lO���>��`=����8��ݹ/���y+�}j����K�]魔/�YP;Y��X�7p����O֋s�UAR��\�O�����E���yR0g���A���f6�Z��l��vrk*q�{$h��&3E��'��IG���
�qvVcQ��VU�������lW��'g�\ �w�
�g�A=8��W�pr>���V89�Q/ed�nW�N�Q�{�(˽.+�5�K���A�톕ο�^Sv��}��O��h��jح�|����1yP��l*�D�WƬ5$�T�H�����1��v����^�x<~Xt�"      b   �  x���͎�J �>E/�9MWUH�tra���D�E��r3�;��� _�9��~��p�%��~rfwy�c�k�g(	��'�L�����n�ܷ�3�"�EA\N�j6;6˰��yh_E%���~ˢ�����[��'��]�vL��{��7F� f� Hx��x��I��=*�����|i�m�Z(���H�MҸ�j���K�Ll��aS���0�nt�68���Pp�s,�����]W�L8����kn��Uuɍ�b.��ң���`⥜Y�Ӡ��%�n^�
�1/��h�_&�����AJ�΄���O�����"��%���*� ]�	EƼ�c���|ҁ:�z��ė�g��K�J����+����Y(
��y��A8"���Z{� �ǈ�>\��"�&��p�����.��Z�$É�xw$D(����;���Qb^��߁��c����-q�ƾ�i��w}�*�5E�ǆo�����4�t'Xס�A�2�S����-��)8�Gxp ع����<{A��H�j�n��F��.,d��@�.������ͪ2�';�)��%}����"�����J�NX�Di�z��s��%֌9my�T��K�����b��z?G[��q�uiw���(�ڞT�po~���W��cF���S=k��`�����KZ�      x   F   x�=�A�0�7���0�M��*��~��M��`L����l�ג�h���xx�e����1U}��     